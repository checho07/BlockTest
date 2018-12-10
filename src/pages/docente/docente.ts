import { ModalNotasPage } from './../../modals/modal-notas/modal-notas';
import { ModalMateriasPage } from './../../modals/modal-materias/modal-materias';
import { CustomLoadingComponent } from './../../components/custom-loading/custom-loading';
import { PopoverPage } from '../../popovers/popover';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
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

interface materia{
  nombre:string,
  grupo:string,
  avatar:string,
  descripcion:string,
  poster:string
}

@Component({
  selector: 'page-docente',
  templateUrl: 'docente.html',
})
export class DocentePage {
  customLoading:any;
  materias :any[];
  segment:boolean = true;
  segmentDocente:string = "asignaturas";
  search:boolean=false;
  estudiantes:any;
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
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      
      return;
    }
    this.materias = this.query({
      name: val
    });
  };

  

   query(obj){
    let result = [];
    let res =  this.db.collection('materias',ref => ref.orderBy('nombre').startAt(new String(obj.name).toLowerCase())).valueChanges().subscribe(res=>{
    result.push(res[0]);
     
    })
      return result;   
  }

  onCancel($event){
    this.ionViewDidLoad();
  };

  openAsignatura(materia){
    let load = this.loadingCtrl.create({
      spinner:"hide",
      content:this.customLoading
    })
    load.present();
    
    this.estudiantes = this.db.collection('estudiantes').valueChanges().subscribe(res=>{
      this.estudiantes = res;
     
      this.modalCtrl.create(ModalNotasPage,{data:{estudiantes:this.estudiantes,asignatura:materia}}).present().then(()=>{
        load.dismiss();
      });
    })

     
  }
}
