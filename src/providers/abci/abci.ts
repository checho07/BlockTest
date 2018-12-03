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
    this.url = "https://39f738e9.ngrok.io/";
  }

  get(endpoint){
    return this.http.get(this.url+endpoint);
  }

  getblock(endpoint,param){
return this.http.get(this.url+endpoint+param)
  }

  postblock(endpoint,param){
    return this.http.get(this.url+endpoint+'tx="'+param+'"')
      }
    
      getvalor(endpoint,param){
        return this.http.get(this.url+endpoint+'"'+param+'"')
          }
        

 

}
