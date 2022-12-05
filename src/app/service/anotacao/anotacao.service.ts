import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Anotacao } from '../../model/anotacao.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  constructor(private http: HttpClient) { }

  obter(uuid?: string): Observable<Anotacao[]> {
    return this.http.get<Anotacao[]>(`${environment.apiUrl}/anotacoes?uuid=${uuid}&_sort=posicao&_order=asc`).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar obter a anotação de uuid [${uuid}]`));
      })
    );
  }

  salvar(anotacao: Anotacao): Observable<Anotacao> {
    if (anotacao.id) {
      return this.http.put<Anotacao>(`${environment.apiUrl}/anotacoes/${anotacao.id}`, anotacao).pipe(
        catchError(() => {
          return throwError(() => new Error(`Ocorreu um erro ao tentar atualizar a anotação de id [${anotacao.id}] e conteúdo [${anotacao.conteudo}]`));
        })
      );
    } 
    return this.http.post<Anotacao>(`${environment.apiUrl}/anotacoes`, anotacao).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar inserir a anotação de conteúdo [${anotacao.conteudo}]`));
      })
    );
  }

  excluir(anotacao: Anotacao): Observable<Anotacao> {
    return this.http.delete<Anotacao>(`${environment.apiUrl}/anotacoes/${anotacao.id}`).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar excluir a anotação de id [${anotacao.id}] e conteúdo [${anotacao.conteudo}]`));
      })
    );
  }
}
