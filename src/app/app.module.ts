import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { DataService } from 'app/data.service';
import { ChartModule } from 'angular2-highcharts';

import { RouterModule } from '@angular/router';

import { LinegraphComponent } from './linegraph/linegraph.component';

import {
  MdSidenavModule, MdToolbarModule, MdMenuModule, MdCardModule,
  MdButtonModule, MdIconModule, MdProgressSpinnerModule
} from '@angular/material';

// MdInputModule,MdCheckboxModule,MdListModule, MdTabsModule, MdRadioModule, MdProgressBarModule,

import { FlexLayoutModule } from '@angular/flex-layout';
import { RatesComponent } from './rates/rates.component';

import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export function highchartsFactory() {
  //const highcharts = require('highcharts');
  // const dd = require('highcharts/modules/drilldown');
  // dd(highcharts);
  return highcharts;
}

@NgModule({
  declarations: [
    AppComponent,
    LinegraphComponent,
    AccountComponent,
    RatesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdMenuModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdProgressSpinnerModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/accounts',
        pathMatch: 'full'
      }, {
        path: 'accounts',
        component: AccountComponent
      }, {
        path: 'rates',
        component: RatesComponent
      }
    ])
  ],
  providers: [DataService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
