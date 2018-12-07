import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-materias',
  templateUrl: 'modal-materias.html',
})
export class ModalMateriasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMateriasPage');
  }
  dismiss() {

  }
}
