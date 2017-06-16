import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';

import { CryptoBalance } from './cryptobalance';
import { Ticker } from 'app/ticker';


@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getValue(currency): Observable<CryptoBalance> {
    return this.http
      .get('/api/wallets/current')
      .map(response => response.json() as CryptoBalance[])
      .map((balances) => {
        return balances.filter((bal: CryptoBalance) => bal.baseCurrency === currency)[0];
      });
  }

  getRate(ticker: string): Observable<Ticker> {
    return this.http
      .get(`/api/prices/${ticker}/latest`)
      .map(response => response.json() as Ticker);
  }
}



