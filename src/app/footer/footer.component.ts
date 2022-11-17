import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  imagem: Imagem = new Imagem('./assets/images/telescopio.png', '35', '40');

  constructor() {}
}

class Imagem {
  caminho: string;
  altura : string;
  largura: string;

  constructor(_caminho: string, _altura: string, _largura: string) { 
    this.caminho = _caminho;
    this.altura = _altura;
    this.largura = _largura;
  }
}


