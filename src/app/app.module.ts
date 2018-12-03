import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalPage } from './../pages/modal/modal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AbciProvider } from '../providers/abci/abci';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalPage
  ],
  imports: [
    BrowserModule,   
    HttpClientModule ,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule       
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AbciProvider,
    HttpClient
  ]
})
export class AppModule {}
