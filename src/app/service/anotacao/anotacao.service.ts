import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anotacao } from '../../model/anotacao.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  constructor(private http: HttpClient) { }

  obter(uuid?: string): Observable<Anotacao[]> {
    return this.http.get<Anotacao[]>(`${environment.apiUrl}/anotacoes?uuid=${uuid}&_sort=posicao&_order=asc`);
  }

  salvar(anotacao: Anotacao): Observable<Anotacao> {
    if (anotacao.id) {
      return this.http.put<Anotacao>(`${environment.apiUrl}/anotacoes/${anotacao.id}`, anotacao);
    } 
    return this.http.post<Anotacao>(`${environment.apiUrl}/anotacoes`, anotacao);
  }

  excluir(anotacao: Anotacao): Observable<Anotacao> {
    return this.http.delete<Anotacao>(`${environment.apiUrl}/anotacoes/${anotacao.id}`);
  }
}
