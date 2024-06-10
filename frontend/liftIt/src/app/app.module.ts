import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NgrokInterceptor } from './ngrok.interceptor';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';

const firebaseConfig = {

  apiKey: "AIzaSyCu2yjVfDw_34P8YdJD9GykKjqTo4xhWVc",
  authDomain: "liftit-caz05e.firebaseapp.com",
  projectId: "liftit-caz05e",
  storageBucket: "liftit-caz05e.appspot.com",
  messagingSenderId: "728349292194",
  appId: "1:728349292194:web:972415ea8fbba1bd84c9fb"
};

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FullCalendarModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: NgrokInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}