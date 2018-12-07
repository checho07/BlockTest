import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, PipeTransform } from '@angular/core';

/**
 * Generated class for the CustomLoadingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-loading',
  template: `<div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
</div><p class="pLoading">Cargando...</p>`
})
export class CustomLoadingComponent implements PipeTransform{

  text: string;

  constructor(private _sanitizer:DomSanitizer) {
    console.log('Hello CustomLoadingComponent Component');
    this.text = 'Hello World';
    this.transform();
  }
  transform():SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(`<div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div><p class="pLoading">Cargando...</p>`);
  }
}
