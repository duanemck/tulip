import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { CryptoBalance } from '../cryptobalance';
import { Ticker } from 'app/ticker';
import { Observable } from "rxjs/Observable";

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
  }
}



