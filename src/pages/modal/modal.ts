import { AbciProvider } from './../../providers/abci/abci';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  param:any
  result:any
  show:any
  numero:any
  dato:any
  valor:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private abci:AbciProvider,public viewCtrl: ViewController) {
 
   this.param = navParams.get('data')
   
   this.action(this.param.verb,this.param.trans)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  action(verb,endpoint){
    // if (verb == 1) {

    //   this.abci.get(endpoint).subscribe(
    //     (data)=>{
    //     this.result = JSON.stringify(data);
    //   })
    // } 

    // alert(verb);
    switch (verb) {
      case 1:
      this.abci.get(endpoint).subscribe(
        (data)=>{
          // this.result= "nombre:"+data["jsonrpc"]
         this.result = JSON.stringify(data);
      })
        break;
        case 2:
        this.abci.get(endpoint).subscribe(
          (data)=>{
           
             this.result= "Creado: "+data["result"]["genesis"]["genesis_time"] +  " Nombre Blockchain: " + data["result"]["genesis"]["chain_id"] 
             + "  Validadores:  "+data["result"]["genesis"]["validators"][0]["address"] + " Power: "+data["result"]["genesis"]["validators"][0]["power"]
            // this.result = JSON.stringify(data);
        })
          break;
          case 3:
          this.abci.get(endpoint).subscribe(
            (data)=>{
              // this.result= "nombre:"+data["jsonrpc"]
             this.result = JSON.stringify(data);
          })
            break;
      case 4:
        this.show = 1;
        break;
      case 5:
        this.show = 2
        break;
        case 6:
        this.show = 3
        break;
    
      default:
      alert("error")
        break;
    }
  }

  consultarbloque(){
    let param = this.numero;
    alert(param)
    this.abci.getblock(this.param.trans,param).subscribe((data)=>{
      this.result = JSON.stringify(data);
    })
  }
s
//   crearbloque(){
//     let param = this.dato;
//     this.abci.postblock(this.param.trans,param).subscribe((data)=>{
//       this.result = JSON.stringify(data);
//   })
// }

buscarv(){
  
  let param = this.valor;
  this.abci.getvalor(this.param.trans,param).subscribe((data)=>{
   if (data["result"]["response"]["value"]) {
    this.result = "key Base64: "+data["result"]["response"]["key"] + "    Decode: "+atob(data["result"]["response"]["value"])
   } else {
    this.result = "Dato no existe";
   }
   
    
},err=>{
  this.result = JSON.stringify(err)
})
}


dismiss(){
  this.viewCtrl.dismiss();
}


}
