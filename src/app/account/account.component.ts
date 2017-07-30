import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { CryptoBalance, WalletSummary } from '../cryptobalance';
import { Ticker } from 'app/ticker';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tulip-account ',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input()
  balances: CryptoBalance[];
  summary: WalletSummary;
  ethbtc: Ticker;
  btczar: Ticker;
  lastUpdate: string;
  loading = true;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.refresh();
    setInterval(() => this.refresh(), 30 * 1000);
  }

  refresh() {
    this.loading = true;
    const wallets$ = this.dataService.getWallets();
    const summary$ = this.dataService.getSummary();

    Observable.forkJoin([wallets$, summary$])
      .subscribe((results: any[]) => {
        [this.balances, this.summary] = results;
        this.loading = false;
        this.lastUpdate = new Date().toLocaleTimeString();
      });
  }
}



