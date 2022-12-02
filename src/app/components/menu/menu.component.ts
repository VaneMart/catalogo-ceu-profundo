import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  exibir: boolean = false;

  constructor() {}

  exibirMenusMobile() {
    this.exibir = !this.exibir;
  } 
}
