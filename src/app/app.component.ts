import { EstudiantePage } from './../pages/estudiante/estudiante';
import { DocentePage } from './../pages/docente/docente';
import { RolePage } from './../pages/role/role';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = RolePage;
  pages: Array<{title: string, component: any,icon:string}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.hide();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon:"home" },
      { title: 'Role', component: RolePage, icon:"contacts" },
      { title: 'Docente', component: DocentePage, icon:"people" },
      { title: 'Estudiante', component: EstudiantePage, icon:"school" }
      
    ];
  }
  openPage(p){
    this.nav.setRoot(p.component);
  }
}

