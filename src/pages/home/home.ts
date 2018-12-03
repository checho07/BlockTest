import { ModalPage } from './../modal/modal';
import { AbciProvider } from './../../providers/abci/abci';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todo = {}
  logForm() {
    console.log(this.todo)
  }

  buttons = [
    {name:"ABCI INFO", trans:"abci_info", verb:1 },
    {name:"BLOQUE GENESIS",trans:"genesis", verb:2},
    {name:"BLOCKCHAIN STATUS",trans:"status", verb:3},
    {name:"CONSULTAR BLOQUE",trans:"block?height=", verb:4},
    {name:"CREAR BLOQUE",trans:"broadcast_tx_commit?" , verb:5},
    {name:"BUSCAR POR VALOR",trans:"abci_query?data=" , verb:6}

  ]
  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {

  }

 
  abrirPagina(data){
    let profileModal = this.modalCtrl.create(ModalPage, { data:data },{showBackdrop:true});
    profileModal.present();
  }

}
