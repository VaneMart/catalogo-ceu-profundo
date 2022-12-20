import { LiteralMapExpr } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { Imagem } from 'src/app/model/imagem.model';
import { Objeto } from 'src/app/model/objeto.model';
import { ImagemService } from 'src/app/service/imagem/imagem.service';
import { ObjetoService } from 'src/app/service/objeto/objeto.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  imagens?: Imagem[];
  objetos?: Objeto[];
  pesquisa?: string;
  pagina?: number;

  constructor(@Inject(ObjetoService) private objetoService: ObjetoService, 
              @Inject(ImagemService) private imagemService: ImagemService) { }

  ngOnInit(): void {
    this.limpar();
  }

  listarObjetos(): void {
    this.limpar();
    if(this.pesquisa && this.pagina) {
      let observable = this.objetoService.listar(this.pesquisa, this.pagina);
      observable.subscribe(response => {
        if(response.length > 0) {
          this.objetos = response;
          response.forEach(objeto => {
            if(objeto.uuid) {
              this.obterImagem(objeto.uuid);
            }
          });
        }
      });
    }
  }

  obterImagem(uuid: string): void {
    let observable = this.imagemService.obter(uuid);
    observable.subscribe(response => {
      if(response.length > 0) {
        this.imagens?.push(response[0]);
      }
    });
  }

  limpar(): void {
    this.imagens = [];
    this.objetos = [];
    this.pagina = 1;
  }
}
