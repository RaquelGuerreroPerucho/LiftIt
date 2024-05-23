import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('El token es:', Preferences.get({
      key: 'userToken'
    }));
  }

}
