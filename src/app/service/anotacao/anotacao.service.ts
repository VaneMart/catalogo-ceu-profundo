import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anotacao } from '../../model/anotacao.model';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  constructor(private http: HttpClient) { }

  obter(uuid?: string): Observable<Anotacao[]> {
    return this.http.get<Anotacao[]>('http://localhost:3000/anotacoes?uuid=' + uuid + '&_sort=posicao&_order=asc');
  }

  salvar(anotacao: Anotacao): Observable<Anotacao> {
    if (anotacao.id) {
      return this.http.put<Anotacao>('http://localhost:3000/anotacoes/' + anotacao.id, anotacao);
    } 
    return this.http.post<Anotacao>('http://localhost:3000/anotacoes', anotacao);
  }

  excluir(anotacao: Anotacao): Observable<Anotacao> {
    return this.http.delete<Anotacao>('http://localhost:3000/anotacoes/' + anotacao.id);
  }
}
