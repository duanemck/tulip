import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';

import { CryptoBalance, WalletSummary } from './cryptobalance';
import { Ticker } from 'app/ticker';

// const server = 'http://continuousdeveloper.com:8080';
const server = 'http://localhost:4000';

// const server = '';


@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getWallets(): Observable<CryptoBalance[]> {
    return this.http
      .get(`${server}/api/wallets/current`)
      .map(response => response.json() as CryptoBalance[]);
  }

  getSummary(): Observable<WalletSummary> {
    return this.http
      .get(`${server}/api/wallets/summary`)
      .map(response => response.json() as WalletSummary);
  }

  getRate(ticker: string): Observable<Ticker> {
    return this.http
      .get(`${server}/api/prices/${ticker}/latest`)
      .map(response => response.json() as Ticker);
  }

  getIntraday(ticker: string): Observable<Ticker[]> {
    return this.http
      .get(`${server}/api/prices/${ticker}/graph/intraday`)
      .map(response => response.json() as Ticker[]);
  }

  getDaily(ticker: string): Observable<Ticker[]> {
    return this.http
      .get(`${server}/api/prices/${ticker}/graph/daily?from=2017-06-01`)
      .map(response => response.json() as Ticker[]);
  }
}



