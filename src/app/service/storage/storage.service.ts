import { Injectable } from '@angular/core';
import { Anotacao } from 'src/app/model/anotacao.model';
import { Imagem } from 'src/app/model/imagem.model';
import { Objeto } from 'src/app/model/objeto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  salvar(objeto: Objeto, imagem: Imagem, anotacoes: Anotacao[]): void {
   
    let objetosStorage = localStorage[`${environment.localStorage}-objetos`];
    let imagensStorage = localStorage[`${environment.localStorage}-imagens`];
    let anotacoesStorage = localStorage[`${environment.localStorage}-anotacoes`];

    objetosStorage =  objetosStorage ? JSON.parse(objetosStorage): [];
    imagensStorage =  imagensStorage ? JSON.parse(imagensStorage): [];
    anotacoesStorage =  anotacoesStorage ? JSON.parse(anotacoesStorage): [];

    objeto.id = objeto.id ? objeto.id : this.gerarId(objetosStorage);
    imagem.id = imagem.id ? imagem.id : this.gerarId(imagensStorage);
    anotacoes.forEach(anotacao => {
      anotacao.id = anotacao.id ? anotacao.id : this.gerarId(anotacoesStorage);
    });

    objetosStorage = this.remover(objetosStorage, objeto);
    imagensStorage = this.remover(imagensStorage, imagem);
    anotacoes.forEach(anotacao => {
      anotacoesStorage = this.remover(anotacoesStorage, anotacao);
    });
      
    objetosStorage.push(objeto);
    imagensStorage.push(imagem);
    anotacoes.forEach(anotacao => {
      anotacoesStorage.push(anotacao);
    });
    
    localStorage[`${environment.localStorage}-objetos`] = JSON.stringify(objetosStorage);
    localStorage[`${environment.localStorage}-imagens`] = JSON.stringify(imagensStorage);
    localStorage[`${environment.localStorage}-anotacoes`] = JSON.stringify(anotacoesStorage);
  }

  remover(storage: [], item: any): [] {
    if(!item.id) {
      return storage;
    }
    let storageAtualizado: [] = [];
    storage.forEach(i => { 
      if(i['id'] != item['id']) {
        storageAtualizado.push(i);
     }
    });
    return storageAtualizado;
  }

  gerarId(storage: []): number {
    if(storage) {
      return Math.max(...storage.map(item=>item['id'])) + 1;
    }
    return 0;    
  }

}
