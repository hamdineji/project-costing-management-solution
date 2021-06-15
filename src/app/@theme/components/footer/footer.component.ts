import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://www.linkedin.com/in/hamdi-neji/" target="_blank">Hamdi Neji</a></b> 2021
    </span>
    <div class="socials">
   
      <a href="https://www.linkedin.com/in/hamdi-neji/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
