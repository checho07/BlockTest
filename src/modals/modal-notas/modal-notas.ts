import { CustomLoadingComponent } from './../../components/custom-loading/custom-loading';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbciProvider } from './../../providers/abci/abci';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ModalNotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-notas',
  templateUrl: 'modal-notas.html',
})
export class ModalNotasPage {
  title:String = '';
  segmentNotas:string = 'datos';
  data:any;
  customLoading:any;
  segment:boolean = false;
  private asignatura : FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public viewCtrl:ViewController,
              public alertCtrl: AlertController,
              private abci: AbciProvider,
              private db: AngularFirestore,
              public toastCtrl :ToastController,
              public loadingCtrl: LoadingController,
              public csm:CustomLoadingComponent) {
                this.customLoading = this.csm.transform();
                this.data = this.navParams.get('data');
    this.title = new String(this.data.asignatura.nombre).charAt(0).toUpperCase()+new String(this.data.asignatura.nombre).slice(1);
    
    this.asignatura = this.formBuilder.group({
      nombre: [this.data.asignatura.nombre, Validators.required],
      grupo: [this.data.asignatura.grupo, Validators.required],
      descripcion: [this.data.asignatura.descripcion, Validators.required],
     
    });
  }

  ionViewDidLoad() { 
    
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  };

  segmentChanged(myEvent){
    if(myEvent._value == "datos"){
      this.segment = false;
     
    }else{
      this.segment = true;
    }    
  };

  notasAlert(estudiante){
    this.alertCtrl.create({
    
    title: 'Registro de notas',
    message: "Digita el corte y la nota para " + estudiante.nombre,
    inputs: [
      {
        name: 'corte',
        type:'number',
        placeholder: 'Corte',
      },
      {
        name: 'nota',
        type:'number',
        placeholder: 'nota',
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role:'cancel'
        
      },
      {
        text: 'Guardar',
        handler: data => {
          let Loading = this.loadingCtrl.create({   
            spinner:"hide",
            content:this.customLoading});
            Loading.present();
          let dataString;
         switch(data.corte){

          case '1':

          dataString = '{ corte:'+data.corte +',nota:'+data.nota+',cedula:'+estudiante.cedula +',grupo:'+ this.data.asignatura.grupo+ '}';  
          this.abci.postblock(dataString).subscribe(res =>{
             if(res['result'] == undefined) {
              this.toastCtrl.create({message:'Esta nota no se puede modificar.',duration:3000}).present();
              Loading.dismiss();
             }else{
              let txData = {bloque1 :res['result']['height']};  
              this.firebaseSaveBlock(estudiante,txData).then(()=>{
                Loading.dismiss();
                this.toastCtrl.create({message:'Nota registrada.',duration:3000}).present();
              })  
              
             }              
           },err =>{
            Loading.dismiss();
              this.toastCtrl.create({message:'Error al generar bloque.',duration:3000}).present();
           }) 
          break;
          case '2':
           dataString = '{ corte:'+data.corte +',nota:'+data.nota+',cedula:'+estudiante.cedula +',grupo:'+ this.data.asignatura.grupo+ '}';  
          
           this.abci.postblock(dataString).subscribe(res =>{
            if(res['result'] == undefined) {
              this.toastCtrl.create({message:'Esta nota no se puede modificar.',duration:3000}).present();
              Loading.dismiss();
             }else{
              let txData = {bloque2: res['result']['height']};     
              this.firebaseSaveBlock(estudiante,txData).then(()=>{
                Loading.dismiss();
                this.toastCtrl.create({message:'Nota registrada.',duration:3000}).present();
              })
             }
        
           },err =>{
            Loading.dismiss();
            this.toastCtrl.create({message:'Esta nota no se puede modificar.',duration:3000}).present();
         }) 
          break;
          case '3':         
          dataString = '{ corte:'+data.corte+',nota:'+data.nota+',cedula:'+estudiante.cedula +',grupo:'+ this.data.asignatura.grupo+ '}';  
          this.abci.postblock(dataString).subscribe(res =>{
            if(res['result'] == undefined) {
              this.toastCtrl.create({message:'Esta nota no se puede modificar.',duration:3000}).present();
             }else{
              let txData = {bloque3:res['result']['height']};   
              this.firebaseSaveBlock(estudiante,txData).then(()=>{
                Loading.dismiss();
                this.toastCtrl.create({message:'Nota registrada.',duration:3000}).present();
              })  
             }                 
           },err =>{
            Loading.dismiss();
            this.toastCtrl.create({message:'Esta nota no se puede modificar.',duration:3000}).present();
         }) 
          break;

         }  

      
        }
      }
    ]
  }).present();
  };

  firebaseSaveBlock(estudiante,txData){   
    
    let ref = this.db.collection('estudiantes').
      doc(String(estudiante.cedula)).
      collection('materias').doc(String(estudiante.cedula + this.data.asignatura.grupo)) 
      
     return  ref.update(txData)
          
   
  }
}
