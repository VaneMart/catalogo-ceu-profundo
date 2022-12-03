import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Anotacao } from 'src/app/model/anotacao.model';
import { Imagem } from 'src/app/model/imagem.model';
import { Objeto } from 'src/app/model/objeto.model';
import { ImagemService } from 'src/app/service/imagem/imagem.service';
import { ObjetoService } from 'src/app/service/objeto/objeto.service';
import { AnotacaoService } from 'src/app/service/anotacao/anotacao.service';
import {v4 as uuid} from 'uuid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() uuid?: string;
  
  objeto!: Objeto;
  imagem!: Imagem;
  anotacoes!: Anotacao[];
  posicao: number = 0;  
  arquivo?: string;



  constructor(@Inject(ObjetoService) private objetoService: ObjetoService, 
              @Inject(ImagemService) private imagemService: ImagemService, 
              @Inject(AnotacaoService) private anotacaoService: AnotacaoService) {}
  
  ngOnInit(): void {
      this.objeto = new Objeto;
      this.imagem = new Imagem;
      this.anotacoes = [];
      this.anotacoes.push(new Anotacao(0));

      if(this.uuid) {
        this.obterObjeto();
        this.obterImagem();
        this.obterAnotacoes();
      }
  }

  obterObjeto(): void {
    let observable = this.objetoService.obter(this.uuid);
    observable.subscribe(response => {
      if(response.length > 0) {
        this.objeto = response[0];
      }
    });
  }

  obterImagem(): void {
    let observable = this.imagemService.obter(this.uuid);
    observable.subscribe(response => {
      if(response.length > 0) {
        this.imagem = response[0];
      }
    });
  }

  obterAnotacoes() {
    let observable = this.anotacaoService.obter(this.uuid);
    observable.subscribe(response => {
      if(response.length > 0) {
        this.anotacoes = response;
      }
    });
  }

  salvar(): void {
    this.salvarObjeto();
    this.salvarImagem();
    this.salvarAnotacoes();
  }

  mover(indice: any): void {
    this.posicao = indice;
  }

  onChange(event: any): void {
    let arquivo = (<FileList>event.srcElement.files)[0];

    if(arquivo) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.imagem.base64 = <string>reader.result;
        this.arquivo = arquivo.name;
        console.log(this.imagem.base64);
      }
      reader.readAsDataURL(arquivo);
    }
  }

  removerImagem(): void {
    this.imagem.base64 = undefined;
  }

  onKeyup(event: any) {
    let anotacao = this.anotacoes[this.posicao];
    if(anotacao.conteudo && anotacao.conteudo.length >= 800) {

      for (let [index, a] of this.anotacoes.entries()) {

        let pb = a.conteudo?.substring(0, 800);
        let sb = a.conteudo?.substring(800, a.conteudo?.length);
        a.conteudo = pb;
        if(sb && sb.length > 0) {
          if(index == this.anotacoes.length -1) {
            let n = new Anotacao(index + 1); 
            n.conteudo = sb;
            this.anotacoes.push(n);
            break;
          } else {
            let p = this.anotacoes[index + 1];
            p.conteudo = p.conteudo ? sb + p.conteudo : sb;
          }
        }
      }
      this.posicao++;   
    } 
  }

  salvarImagem(): void {
    this.imagem.uuid = this.imagem.uuid ? this.imagem.uuid : this.objeto.uuid;
    let observable = this.imagemService.salvar(this.imagem);
    observable.subscribe(response => {
      if(response.id) {
        this.imagem = response; 
      }
    });
  }

  salvarObjeto(): void {
    this.objeto.uuid = this.objeto.uuid ? this.objeto.uuid : uuid();
    this.objeto.data = new Date().toLocaleString();
    let observable = this.objetoService.salvar(this.objeto);
    observable.subscribe(response => {
      if(response.id) {
        this.objeto = response; 
      }
    });
  }

  salvarAnotacoes(): void {
    this.anotacoes.forEach(anotacao => {
      anotacao.uuid = anotacao.uuid ? anotacao.uuid : this.objeto.uuid;
       let observable = this.anotacaoService.salvar(anotacao);
       observable.subscribe(response => {
        if(response.id) {
          anotacao = response; 
        }
       });
    });
  }
}
