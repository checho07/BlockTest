import { AbciProvider } from './../../providers/abci/abci';
import { Observable } from 'rxjs/Observable';

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the ModalNotasEstudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-notas-estudiante',
  templateUrl: 'modal-notas-estudiante.html',
})
export class ModalNotasEstudiantePage {

  asignaturas:any;
  data:any;
  corte1;
  corte2;
  corte3;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              private db: AngularFirestore,
              private abci: AbciProvider
             ) {


  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  };

  alertNotas(asignatura){
      let ref = this.db.collection('estudiantes').doc(String(this.data.cedula)).
      collection('materias').doc(String(this.data.cedula + asignatura.Grupo)).valueChanges().subscribe(res=>{
        res.bloque1 ? this.consultarBloque(res.bloque1)  : null;
        res.bloque2 ? this.corte2 = res.bloque2 : null;
        res.bloque3 ? this.corte3 = res.bloque3 : null;

        console.log(this.corte1+this.corte2+this.corte3)
      })
      
  }

  consultarBloque(bloque){
    this.abci.getblock(bloque).subscribe(res=>{
      console.log(atob(res.result.block.data.txs[0]));
    })
  }

  ionViewWillEnter(){  
  
    this.data = this.navParams.get('data');
    this.asignaturas = this.data.res;

  };


}
