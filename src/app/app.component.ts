import { DataService } from './data.service';
import { CryptoBalance } from './cryptobalance';
import { Component, OnInit, Input } from "@angular/core";
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tulip-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  balances: CryptoBalance[];
  loading = false;
  lastUpdate: string;

  constructor(private dataService: DataService) {

  }


  closeMenu(menu) {
    menu.close();
  }



}
