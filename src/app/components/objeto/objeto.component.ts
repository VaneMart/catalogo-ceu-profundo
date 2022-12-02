import { Component, Input } from '@angular/core';
import { Imagem } from 'src/app/model/imagem.model';
import { Objeto } from 'src/app/model/objeto.model';
import { ImagemComponent } from '../imagem/imagem.component';

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.css'],
})
export class ObjetoComponent {

  
  imagemComponent!: ImagemComponent;

  @Input() objeto?: Objeto;
  @Input() imagem?: Imagem;

  constructor() {}
}
