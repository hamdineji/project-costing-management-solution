import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <nb-card>
      <nb-card-header>
        CKEditor
      </nb-card-header>
      <nb-card-body>
      
        <ckeditor [(ngModel)]="model" [config]="{ extraPlugins: 'divarea', height: '320' }"></ckeditor>
      </nb-card-body>
      <button (click)="afficher()">afficher</button>
    </nb-card>
  `,
})
export class CKEditorComponent {
model=""

afficher(){
  console.log("modeeel", this.model)
}
}
