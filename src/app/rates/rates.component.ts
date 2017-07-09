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
  ethxbtGraph: Object;
  zarethGraph: Object;

  zarxbtGraph2: Object;
  ethxbtGraph2: Object;
  zarethGraph2: Object;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.refresh();
    // setInterval(() => this.refresh(), 30 * 1000);
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
        this.ethxbtGraph = this.buildGraphOptions('ETH/XBT Today', ethbtc, true);

        const calculated = [];
        for (let i = 0; i < btczar.length; i++) {
          calculated.push({
            time: btczar[i].time,
            price: btczar[i].price * ethbtc[i].price
          });
        }
        this.zarethGraph = this.buildGraphOptions('ZAR/ETH Today', calculated, true);
      });

    const bitcoinDaily$ = this.dataService.getDaily('XBTZAR');
    const etherDaily$ = this.dataService.getDaily('ethbtc');

    Observable.forkJoin([bitcoinDaily$, etherDaily$])
      .subscribe((results: Ticker[][]) => {
        const [btczar, ethbtc] = results;

        this.zarxbtGraph2 = this.buildGraphOptions('ZAR/XBT Daily', btczar, false);
        this.ethxbtGraph2 = this.buildGraphOptions('ETH/XBT Daily', ethbtc, false);

        const calculated = [];
        for (let i = 0; i < btczar.length; i++) {
          calculated.push({
            date: btczar[i].date,
            price: btczar[i].price * ethbtc[i].price
          });
        }
        this.zarethGraph2 = this.buildGraphOptions('ZAR/ETH Daily', calculated, false);
      });

  }

  private buildGraphOptions(title: string, tickerData: Ticker[], intraday: boolean) {
    return {
      title: { text: title },
      series: [{
        data: intraday ? this.toIntradayGraphData(tickerData) : this.toDailyGraphData(tickerData)
      }],
      xAxis: {
        type: 'datetime'
      },
    }
  }

  private toIntradayGraphData(data: Ticker[]) {
    return data.map(t => {
      const x = [moment(t.time).add('hours', 2).valueOf(), t.price];
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



