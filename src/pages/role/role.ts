import { EstudiantePage } from './../estudiante/estudiante';
import { DocentePage } from './../docente/docente';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }
  openDocente(){
    this.navCtrl.setRoot(DocentePage);
  };
  openEstudiante(){
    this.navCtrl.setRoot(EstudiantePage);
  };
  
}
