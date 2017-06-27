import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {MainPage } from '../pages/main/main';
import {FormPage } from '../pages/form/form';

@Component({
  templateUrl: 'app.html'
}) 
export class MyApp {

  @ViewChild('nav')nav:Nav;
  private rootPage:any;
  public pages:Array<{titulo:string,component:any,icono:string,visible:boolean }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = MainPage;
    this.pages=[
          {titulo:'Lista de pendientes',component:MainPage,icono:'list',visible:true},
          {titulo:'Agregando tarea',component:FormPage,icono:'list',visible:false}
          ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      splashScreen.show();
    });
  }
  goToPage(page){
    this.nav.setRoot(page);

  }
}

