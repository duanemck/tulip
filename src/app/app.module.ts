import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { DataService } from 'app/data.service';
import { ChartsModule } from 'ng2-charts';

import { RouterModule } from '@angular/router';

import { LinegraphComponent } from './linegraph/linegraph.component';

import {
  MdSidenavModule, MdToolbarModule, MdMenuModule, MdCardModule,
  MdButtonModule, MdIconModule, MdProgressSpinnerModule
} from '@angular/material';

// MdInputModule,MdCheckboxModule,MdListModule, MdTabsModule, MdRadioModule, MdProgressBarModule,

import { FlexLayoutModule } from '@angular/flex-layout';
import { RatesComponent } from './rates/rates.component';

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
    ChartsModule,
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
