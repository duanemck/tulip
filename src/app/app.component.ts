import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CryptoBalance } from './cryptobalance';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { Ticker } from 'app/ticker';

@Component({
  selector: 'tulip-root ',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lastBtc: CryptoBalance;
  lastEth: CryptoBalance;
  btc: CryptoBalance;
  eth: CryptoBalance;
  lastEthbtc: Ticker;
  lastbtczar: Ticker;
  ethbtc: Ticker;
  btczar: Ticker;
  lastUpdate: string;

  gainLossPercent: number;
  gainLoss: number;
  totalRand: number;
  totalBTC: number;
  title = 'app';
  balances: CryptoBalance[];
  investment = 1000;
  loading = true;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.refresh();
    //setInterval(() => this.refresh(), 30 * 1000);
  }

  refresh() {
    this.loading = true;
    const lunoBitcoin$ = this.dataService.getValue('xbt');
    const bitfinexEther$ = this.dataService.getValue('eth');
    const ether2bitcoin$ = this.dataService.getRate('ethbtc');
    const bitcoin2rand$ = this.dataService.getRate('XBTZAR')

    Observable.forkJoin([lunoBitcoin$, bitfinexEther$, ether2bitcoin$, bitcoin2rand$])
      .subscribe((results: any[]) => {
        this.lastEthbtc = this.ethbtc;
        this.lastbtczar = this.btczar;
        this.lastBtc = this.btc;
        this.lastEth = this.eth;

        [this.btc, this.eth, this.ethbtc, this.btczar] = results;

        this.balances = [this.btc, this.eth];
        this.totalBTC = this.btc.baseValue + this.eth.baseValue * +this.ethbtc.price;
        this.totalRand = Math.round(this.totalBTC * +this.btczar.price * 100) / 100;

        this.btc.randValue = Math.round(this.btc.baseValue * +this.btczar.price * 100) / 100;
        this.eth.randValue = Math.round(this.eth.baseValue * +this.ethbtc.price * +this.btczar.price * 100) / 100;

        this.btc.change = this.lastBtc ? Math.round((this.btc.randValue - this.lastBtc.randValue) * 100) / 100 : 0;
        this.eth.change = this.lastEth ? Math.round((this.eth.randValue - this.lastEth.randValue) * 100) / 100 : 0;

        this.gainLoss = Math.round((this.totalRand - this.investment) * 100) / 100;
        this.gainLossPercent = Math.round(this.gainLoss / this.investment * 10000) / 100;
        this.loading = false;
        this.lastUpdate = new Date().toLocaleTimeString();
      });
  }


}
