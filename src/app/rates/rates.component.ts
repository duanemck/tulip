import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { CryptoBalance } from '../cryptobalance';
import { Ticker } from 'app/ticker';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'tulip-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {
  @Input() balances: CryptoBalance[];

  lastEthbtc: Ticker;
  lastbtczar: Ticker;
  ethbtc: Ticker;
  btczar: Ticker;
  lastUpdate: string;

  loading = true;
  zarxbtGraph: Object;
  zarethGraph: Object;
  zarxbtGraph2: Object;
  zarethGraph2: Object;

  type = 'line';
  options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    }
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.refresh();
    setInterval(() => this.refresh(), 60 * 1000 * 5);
  }

  saveInstance(name, chart) {
    setTimeout(() => {
      chart.reflow();
    }, 5000);
  }

  refresh() {
    this.loading = true;
    const bitcoin2rand$ = this.dataService.getRate('XBTZAR');

    bitcoin2rand$.subscribe(btczar => {
      this.lastbtczar = this.btczar;
      this.btczar = btczar;
      this.loading = false;
      this.lastUpdate = new Date().toLocaleTimeString();
    });

    const bitcoinRate$ = this.dataService.getIntraday('XBTZAR');

    bitcoinRate$.subscribe(btczar => {
      this.zarxbtGraph = this.buildGraphOptions('ZAR/BTC Today', btczar, true);
    });

    const bitcoinDaily$ = this.dataService.getDaily('XBTZAR');

    bitcoinDaily$.subscribe(btczar => {
      this.zarxbtGraph2 = this.buildGraphOptions(
        'ZAR/BTC Daily',
        btczar,
        false
      );
    });
  }

  private buildGraphOptions(
    title: string,
    tickerData: Ticker[],
    intraday: boolean
  ) {
    return {
      labels: tickerData.map(t =>
        moment(intraday ? t.time : t.date).format(
          intraday ? 'HH:mm' : 'YYYY-MM-DD'
        )
      ),
      datasets: [
        {
          label: title,
          data: tickerData.map(t => t.price)
        }
      ]
    };
  }

  private toIntradayGraphData(data: Ticker[]) {
    return data.map(t => {
      const x = [
        moment(t.time)
          .add(2, 'hours')
          .format('HH:mm'),
        t.price
      ];
      return x;
    });
  }

  private toDailyGraphData(data: Ticker[]) {
    return data.map(t => {
      const x = [moment(t.date).valueOf(), t.price];
      return x;
    });
  }
}
