import { Component, Inject, Input, OnInit } from '@angular/core';
import { TituloComponent } from '../titulo/titulo.component';
import { Objeto } from 'src/app/model/objeto.model';
import { FormularioComponent } from '../formulario/formulario.component';
import { ActivatedRoute } from '@angular/router';
import { AnotacaoService } from 'src/app/service/anotacao/anotacao.service';
import { ObjetoService } from 'src/app/service/objeto/objeto.service';
import { ImagemService } from 'src/app/service/imagem/imagem.service';
import { Imagem } from 'src/app/model/imagem.model';
import { Anotacao } from 'src/app/model/anotacao.model';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {

  tituloComponent!: TituloComponent;
  formularioComponent!: FormularioComponent;

  uuid?: string;
  titulo!: string;
  objeto!: Objeto; 
  imagem!: Imagem;
  anotacoes!: Anotacao[];

  constructor(private activatedRoute: ActivatedRoute,
    @Inject(ObjetoService) private objetoService: ObjetoService, 
    @Inject(AnotacaoService) private anotacaoService: AnotacaoService, 
    @Inject(ImagemService) private imagemService: ImagemService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.uuid = params['uuid'];
      let uuid = params['uuid'];
      if(uuid) {
        this.titulo = "Alterar objeto";
        this.obterObjeto(uuid);
        this.obterImagem(uuid);
        this.obterAnotacoes(uuid);
      } else {
        this.titulo = "Novo objeto";
        this.objeto = new Objeto;
        this.imagem = new Imagem;
        this.anotacoes = [];
        this.anotacoes.push(new Anotacao(0));
      }
    });
  }

  obterObjeto(uuid: string) {
    let observable = this.objetoService.obter(uuid);
    observable.subscribe((response => {
      if(response.length > 0) {
        this.objeto = response[0];
      }
    }));
  }

  obterImagem(uuid: string) {
    let observable = this.imagemService.obter(uuid);
    observable.subscribe((response => {
      if(response.length > 0) {
        this.imagem = response[0];
      }
    }));
  }

  obterAnotacoes(uuid: string) {
    let observable = this.anotacaoService.obter(uuid);
    observable.subscribe((response => {
      if(response.length > 0) {
        this.objeto = response[0];
      }
    }));
  }
}
