import { Component, Inject, OnInit } from '@angular/core';
import { Anotacao } from 'src/app/model/anotacao.model';
import { Imagem } from 'src/app/model/imagem.model';
import { Objeto } from 'src/app/model/objeto.model';
import { AnotacaoService } from 'src/app/service/anotacao/anotacao.service';
import { ImagemService } from 'src/app/service/imagem/imagem.service';
import { ObjetoService } from '../../service/objeto/objeto.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  titulo?: string;
  objeto?: Objeto;
  imagem?: Imagem;
  anotacoes?: Anotacao[];


  constructor(@Inject(ObjetoService) private objetoService: ObjetoService, 
              @Inject(AnotacaoService) private anotacaoService: AnotacaoService, 
              @Inject(ImagemService) private imagemService: ImagemService) {}
  
  ngOnInit(): void {
    this.titulo = "Nenhum objeto catalogado";
    this.obterUltimo();
  }


  obterUltimo() {
      let observable = this.objetoService.obterUltimo();
      observable.subscribe((response => {
          if(response.length > 0) {
            this.objeto = response[0];
            this.titulo = "Último objeto catalogado";
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





