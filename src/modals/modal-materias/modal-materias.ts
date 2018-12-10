import { CustomLoadingComponent } from './../../components/custom-loading/custom-loading';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-modal-materias',
  templateUrl: 'modal-materias.html',
})
export class ModalMateriasPage {

  title:string = 'Asignatura';
  segmentAsignatura:string = 'asignatura';
  segment:boolean = true;
  customLoading:any;
  cantidadEstudiantes:any;
  private asignatura : FormGroup;
  private estudiantes : FormGroup;
  private asignaturaId:any;
  validForm:boolean=true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              private formBuilder: FormBuilder,
              private db: AngularFirestore,
              public loadingCtrl: LoadingController,
              public csm:CustomLoadingComponent,
              public toastCtrl: ToastController
              ) 
              {
                this.customLoading = this.csm.transform()
                this.asignatura = this.formBuilder.group({
                  nombre: ['', Validators.required],
                  grupo: ['', Validators.required],
                  descripcion: ['', Validators.required],
                  avatar: [''],
                  poster:['']
                });
                this.estudiantes = this.formBuilder.group({
                  nombre1: ['Sergio Velandia'],
                  cedula1: ['1031148001'],
                  nombre2: ['Leidy Castiblanco'],
                  cedula2: ['1023568912'],
                });
        
               };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMateriasPage');
   };             
  
  dismiss() {
    this.viewCtrl.dismiss();
  };

  segmentChanged(myEvent){
    if(myEvent._value == "estudiantes"){
      this.segment = false;
      this.title = 'Estudiantes';
    }else{
      this.segment = true;
      this.title = 'Asignatura';
    }    
  };



  asignaturaForm(){
    let colection = this.db.collection('materias')
    let formValue = this.asignatura.value;
    let Loading = this.loadingCtrl.create({   
      spinner:"hide",
      content:this.customLoading});
      Loading.present();
      let poster;
      let random = Math.floor(Math.random()*7);  
      switch(random){
        case 0:
        poster = '../../assets/imgs/poster1.jpg'
        break;
        case 1:
        poster = '../../assets/imgs/poster2.jpg'
        break;
        case 2:
        poster = '../../assets/imgs/poster3.jpg'
        break;
        case 3:
        poster = '../../assets/imgs/poster4.jpg'
        break;
        case 4:
        poster = '../../assets/imgs/poster5.jpg'
        break;
        case 5:
        poster = '../../assets/imgs/poster6.jpg'
        break;
        case 6:
        poster = '../../assets/imgs/poster7.jpg'
        break;      
      } ;
   
    
    colection.add({
        
        nombre: new String(formValue.nombre).toLowerCase(),
        grupo:formValue.grupo,
        descripcion: formValue.descripcion,
        avatar: '../../assets/imgs/professor.png',
        poster:poster

    }).then(res =>{

      this.toastCtrl.create({message:'Asignatura Guardada.',duration:3000}).present();
      this.segmentAsignatura = 'estudiantes';
      Loading.dismiss()
      this.asignatura.disable();   
      this.validForm = false;  
      console.log(res);
      this.asignaturaId = res.id;


    }).catch(err => {

      Loading.dismiss()
      this.toastCtrl.create({message:err,duration:3000}).present();
      console.log(err);
    })
  };

  estudiantesForm(){  

    let colEstudiante1 = this.db.collection('estudiantes').doc('1031148001').collection('materias');    
    let colEstudiante2= this.db.collection('estudiantes').doc('1023568931').collection('materias');
    let formAsignaturaValue = this.asignatura.value;
    let Loading = this.loadingCtrl.create({   
      spinner:"hide",
      content:this.customLoading});
      Loading.present();

      colEstudiante1.add({
        Nombre:formAsignaturaValue.nombre,
        Grupo:formAsignaturaValue.grupo,
        Id:this.asignaturaId
      }).then(res=>{
        Loading.dismiss();
      });
      
      colEstudiante2.add({
        Nombre:formAsignaturaValue.nombre,
        Grupo:formAsignaturaValue.grupo,
        Id:this.asignaturaId
      }).then(res=>{

        this.toastCtrl.create({message:'Estudiantes registrados.',duration:3000}).present();
        this.dismiss();
        Loading.dismiss();
      })
 
 



  }

 
}
