import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AbciProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AbciProvider {

  url:string;

  constructor(public http: HttpClient) {
    console.log('Hello AbciProvider Provider');
    this.url = "https://6fd980c9.ngrok.io/";
  }

  get(endpoint){
    return this.http.get(this.url+endpoint);
  }

  getblock(param){
return this.http.get(this.url+'block?height='+param)
  }

  postblock(param){
    return this.http.get(this.url+'broadcast_tx_commit?tx="'+param+'"')
      }
    
      getvalor(endpoint,param){
        return this.http.get(this.url+endpoint+'"'+param+'"')
          }
        

 

}
