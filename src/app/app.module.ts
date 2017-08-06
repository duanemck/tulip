import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { DataService } from 'app/data.service';

import { RouterModule } from '@angular/router';

import {
  MdSidenavModule, MdToolbarModule, MdMenuModule, MdCardModule,
  MdButtonModule, MdIconModule, MdProgressSpinnerModule, MdTableModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk'

import { FlexLayoutModule } from '@angular/flex-layout';
import { RatesComponent } from './rates/rates.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    RatesComponent
  ],
  imports: [
    ChartModule,
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
    CdkTableModule,
    MdTableModule,
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
