import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { CryptoBalance, WalletSummary } from '../cryptobalance';
import { Ticker } from 'app/ticker';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'tulip-account ',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    @Input() balances: CryptoBalance[];
    summary: WalletSummary;
    ethbtc: Ticker;
    btczar: Ticker;
    lastUpdate: string;
    loading = true;

    displayedColumns = ['source', 'base', 'rand', 'today', 'pl'];
    dataSource: BalanceDataSource | null;

    wallets$: Observable<CryptoBalance[]>;
    wallets: CryptoBalance[];

    constructor(private dataService: DataService) {}
    ngOnInit() {
        this.refresh();
        setInterval(() => this.refresh(), 30 * 1000);
    }

    refresh() {
        this.loading = true;
        this.wallets$ = this.dataService.getWallets();
        const summary$ = this.dataService.getSummary();

        const table$ = Observable.forkJoin([this.wallets$, summary$]).map((results: any[]) => {
            let wallets: CryptoBalance[];
            let summary: WalletSummary;

            [wallets, summary] = results;

            const summaryAsWallet = new CryptoBalance();
            summaryAsWallet.baseCurrency = 'xbt';
            summaryAsWallet.baseValue = summary.totalBTC;
            summaryAsWallet.currentValueRand = summary.totalRand;
            summaryAsWallet.changeSinceStartRand = summary.gainLoss;
            summaryAsWallet.changeSinceStartPercent = summary.gainLossPercent;
            summaryAsWallet.changeTodayRand = summary.todayChange;
            summaryAsWallet.changeTodayPercent = summary.todayChangePercent;
            summaryAsWallet.source = 'Combined';

            wallets.push(summaryAsWallet);
            this.lastUpdate = new Date().toLocaleString();
            return wallets;
        });

        this.dataSource = new BalanceDataSource(table$);
        this.wallets$.subscribe(wallets => (this.wallets = wallets));
        summary$.subscribe(sum => (this.summary = sum));
    }
}

export class BalanceDataSource extends DataSource<any> {
    constructor(private balances: Observable<CryptoBalance[]>) {
        super();
    }

    connect(): Observable<CryptoBalance[]> {
        return this.balances;
    }

    disconnect() {}
}
