import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalNotasEstudiantePage } from './../../modals/modal-notas-estudiante/modal-notas-estudiante';
import { PopoverPage } from './../../popovers/popover';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-estudiante',
  templateUrl: 'estudiante.html',
})
export class EstudiantePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              private db : AngularFirestore,) {
  }

  ionViewDidLoad() {
   
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  };
  consultarNotas(cedula):Observable<any>{
     
      return  this.db.collection('estudiantes').doc(cedula+'').collection('materias').valueChanges()

  }

  notas1(cedula){
    this.consultarNotas(cedula).subscribe(res=>{

      this.modalCtrl.create(ModalNotasEstudiantePage,{data:{res:res,cedula:cedula}}).present();
    })
    
  };


}
