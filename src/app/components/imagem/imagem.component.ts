import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Imagem } from 'src/app/model/imagem.model';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css']
})
export class ImagemComponent implements OnChanges {

  @Input() imagem?: Imagem;

  base64?: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['imagem'].currentValue) {
      this.base64 = changes['imagem'].currentValue.base64;
    }
  }

  @HostListener('window:resize')
  onResize(): void {}
}
