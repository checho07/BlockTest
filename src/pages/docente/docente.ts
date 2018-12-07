import { ModalMateriasPage } from './../../modals/modal-materias/modal-materias';
import { CustomLoadingComponent } from './../../components/custom-loading/custom-loading';
import { PopoverPage } from '../../popovers/popover';
import { AngularFirestore  } from '@angular/fire/firestore';
import { Component  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController, NavParams, PopoverController, LoadingController, ToastController, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the DocentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-docente',
  templateUrl: 'docente.html',
})
export class DocentePage {
  customLoading:any;
  materias :any[];
  segment:boolean = true;
  segmentDocente:string = "asignaturas";
  constructor(
    public navCtrl: NavController, 
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private db : AngularFirestore,
              public loadingCtrl: LoadingController,
              public csm:CustomLoadingComponent,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController            ) {
              this.customLoading = this.csm.transform();
  }
  
   async ionViewDidLoad() {
    console.log('ionViewDidLoad DocentePage');
    
   let load = this.loadingCtrl.create({
     spinner:"hide",
     content:this.customLoading
   })
   load.present(); 
 
    
    await this.db.collection('materias').valueChanges().subscribe(res=>{
       console.log(res);
       this.materias = res;
       load.dismiss();

       if(res.length == 0 || res == undefined){
        load.dismiss();
        this.toastCtrl.create({
          message:"Upps, falló la conexion.",
          duration:3000
        }).present();
       }

     },err =>{
       load.dismiss();
       this.toastCtrl.create({
         message:"Upps, falló la conexion.",
         duration:3000
       }).present();
     });
    }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  segmentChanged(myEvent){
    if(myEvent._value == "notas"){
      this.segment = false;
    }else{
      this.segment = true;
    }    
  }

  openModalMaterias(){
    let options: ModalOptions = {
      showBackdrop:true
    }
   this.modalCtrl.create(ModalMateriasPage,options).present();
  
  }

}
