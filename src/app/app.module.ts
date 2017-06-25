import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DataService } from 'app/data.service';
import { ChartsModule } from 'ng2-charts';

import { LinegraphComponent } from './linegraph/linegraph.component';
import { WalletComponent } from './wallet/wallet.component'
import {
  MdInputModule, MdSidenavModule, MdCheckboxModule, MdToolbarModule,
  MdMenuModule, MdCardModule, MdListModule, MdTabsModule, MdRadioModule, MdProgressBarModule,
  MdButtonModule, MdIconModule, MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LinegraphComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdSidenavModule,
    MdCheckboxModule,
    MdToolbarModule, MdMenuModule, MdCardModule, MdListModule, MdTabsModule, MdRadioModule,
    MdProgressBarModule, MdButtonModule, MdIconModule,MdProgressSpinnerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
