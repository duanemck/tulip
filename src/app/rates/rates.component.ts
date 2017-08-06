import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { CryptoBalance } from '../cryptobalance';
import { Ticker } from 'app/ticker';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'tulip-rates ',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  @Input()
  balances: CryptoBalance[];

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
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    // scales: {
    //   xAxes: {
    //     type: 'time',
    //     unit: 'hour',
    //     unitStepSize: 1,
    //     time: {
    //       displayFormats: {
    //         'hour': 'HH:mm'
    //       }
    //     }
    //   }
    // }
  };

  constructor(private dataService: DataService) {

  }

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
    const ether2bitcoin$ = this.dataService.getRate('ethbtc');
    const bitcoin2rand$ = this.dataService.getRate('XBTZAR')

    Observable.forkJoin([ether2bitcoin$, bitcoin2rand$])
      .subscribe((results: any[]) => {
        this.lastEthbtc = this.ethbtc;
        this.lastbtczar = this.btczar;

        const [ethbtc, btczar] = results;

        this.ethbtc = ethbtc;
        this.btczar = btczar;

        this.loading = false;
        this.lastUpdate = new Date().toLocaleTimeString();
      });

    const bitcoinRate$ = this.dataService.getIntraday('XBTZAR');
    const etherRate$ = this.dataService.getIntraday('ethbtc');

    Observable.forkJoin([bitcoinRate$, etherRate$])
      .subscribe((results: Ticker[][]) => {
        const [btczar, ethbtc] = results;

        this.zarxbtGraph = this.buildGraphOptions('ZAR/XBT Today', btczar, true);

        const calculated = [];
        for (let i = 0; i < btczar.length; i++) {
          if (btczar[i] && ethbtc[i]) {
            calculated.push({
              time: btczar[i].time,
              price: btczar[i].price * ethbtc[i].price
            });
          }
        }
        this.zarethGraph = this.buildGraphOptions('ZAR/ETH Today', calculated, true);
      });

    const bitcoinDaily$ = this.dataService.getDaily('XBTZAR');
    const etherDaily$ = this.dataService.getDaily('ethbtc');

    Observable.forkJoin([bitcoinDaily$, etherDaily$])
      .subscribe((results: Ticker[][]) => {
        const [btczar, ethbtc] = results;

        this.zarxbtGraph2 = this.buildGraphOptions('ZAR/XBT Daily', btczar, false);

        const calculated = [];
        for (let i = 0; i < btczar.length; i++) {
          if (btczar[i] && ethbtc[i]) {
            calculated.push({
              date: btczar[i].date,
              price: btczar[i].price * ethbtc[i].price
            });
          }
        }
        this.zarethGraph2 = this.buildGraphOptions('ZAR/ETH Daily', calculated, false);
      });

  }

  private buildGraphOptions(title: string, tickerData: Ticker[], intraday: boolean) {
    return {
      labels: tickerData.map(t => moment(intraday ? t.time : t.date).format(intraday ? 'HH:mm' : 'YYYY-MM-DD')),
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
      const x = [moment(t.time).add(2, 'hours').format('HH:mm'), t.price];
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



