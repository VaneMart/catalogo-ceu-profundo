import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [
    MatToolbarModule, 
    MatIconModule,
    BrowserModule]
})
export class MenuComponent  {

  itens: string[] = ['Pesquisar', 'Catalogar'];
  exibir: boolean = false;

  constructor() {}

  exibirMenus() {
    this.exibir = !this.exibir;
  } 

}
