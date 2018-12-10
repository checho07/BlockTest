import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

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
  segment:boolean = false;
  private asignatura : FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public viewCtrl:ViewController,
              public alertCtrl: AlertController) {

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
          
        }
      }
    ]
  }).present();
  };
}
