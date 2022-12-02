import { Component, Inject, Input } from '@angular/core';
import { Anotacao } from 'src/app/model/anotacao.model';
import { AnotacaoService } from 'src/app/service/anotacao/anotacao.service';

@Component({
  selector: 'app-anotacao',
  templateUrl: './anotacao.component.html',
  styleUrls: ['./anotacao.component.css']
})
export class AnotacaoComponent {

  @Input()anotacoes?: Anotacao[];

  posicao?: number = 0;

  constructor(@Inject(AnotacaoService) private anotacaoService: AnotacaoService) {}

  mover(indice: any): void {
    this.posicao = indice;
  }
}
