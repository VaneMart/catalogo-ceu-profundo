import { Component, Inject, OnInit } from '@angular/core';
import { AnotacaoComponent } from '../anotacao/anotacao.component';
import { ObjetoComponent } from '../objeto/objeto.component';
import { TituloComponent } from '../titulo/titulo.component';
import { ObjetoService } from '../../service/objeto/objeto.service';
import { Objeto } from 'src/app/model/objeto.model';
import { Operacao } from 'src/app/model/operacao.enumeration';
import { Anotacao } from 'src/app/model/anotacao.model';
import { AnotacaoService } from 'src/app/service/anotacao/anotacao.service';
import { ImagemService } from 'src/app/service/imagem/imagem.service';
import { Imagem } from 'src/app/model/imagem.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  tituloComponent!: TituloComponent;
  objetoComponent!: ObjetoComponent;
  anotacaoComponent!: AnotacaoComponent;


  titulo?: string;
  objeto?: Objeto;
  imagem?: Imagem;
  anotacoes?: Anotacao[];
  operacao?: Operacao;

  constructor(@Inject(ObjetoService) private objetoService: ObjetoService, 
              @Inject(AnotacaoService) private anotacaoService: AnotacaoService, 
              @Inject(ImagemService) private imagemService: ImagemService) {}
  
  ngOnInit(): void {
    this.titulo = "Nenhum objeto catalogado";
    this.obterUltimoObjeto();
  }


  obterUltimoObjeto() {
    let observable = this.objetoService.obterUltimoObjeto();
    observable.subscribe((response => {
      if(response.length > 0) {
        this.titulo = "Último objeto catalogado";
        this.objeto = response[0];
        this.obterAnotacoes();
        this.obterImagem();
      }
    }));
  }

  obterAnotacoes() {
    let observable = this.anotacaoService.obter(this.objeto?.uuid);
    observable.subscribe((response => {
      if(response.length > 0) {
        this.anotacoes = response;
      }
    }));
  }

  obterImagem() {
    let observable = this.imagemService.obter(this.objeto?.uuid);
    observable.subscribe((response => {
      if(response.length > 0) {
        this.imagem = response[0];
      }
    }));
  }

  excluir() {
    if(this.objeto) {
      this.objetoService.excluir(this.objeto).subscribe();
    }
    if(this.imagem) {
      this.imagemService.excluir(this.imagem).subscribe();
    }
    if(this.anotacoes && this.anotacoes.length > 0) {
      this.anotacoes.forEach(anotacao => {
        this.anotacaoService.excluir(anotacao).subscribe();
      });
    }
  }
}





