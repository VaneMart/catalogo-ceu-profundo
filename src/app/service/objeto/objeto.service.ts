import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Objeto } from 'src/app/model/objeto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  constructor(private http: HttpClient) { }

  obterUltimo(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(`${environment.apiUrl}/objetos?_sort=data&_order=desc&_limit=1`).pipe(
      catchError(() => {
        return throwError(() => new Error("Ocorreu um erro ao tentar obter o último objeto catalogado"));
      })
    );
  }

  obter(uuid?: string): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(`${environment.apiUrl}/objetos?uuid=${uuid}&_sort=posicao&_order=asc`).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar obter o objeto de uuid [${uuid}]`));
      })
    );
  }

  salvar(objeto: Objeto): Observable<Objeto> {
    if (objeto.id) {
      return this.http.put<Objeto>(`${environment.apiUrl}/objetos/${objeto.id}`, objeto).pipe(
        catchError(() => {
          return throwError(() => new Error(`Ocorreu um erro ao tentar atualizar o objeto de id [${objeto.id}] e nome [${objeto.nome}]`));
        })
      );
    } 
    return this.http.post<Objeto>(`${environment.apiUrl}/objetos`, objeto).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar inserir o objeto de nome [${objeto.nome}]`));
      })
    );
  }

  excluir(objeto: Objeto): Observable<Objeto> {
    return this.http.delete<Objeto>(`${environment.apiUrl}/objetos/${objeto.id}`).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar excluir o objeto de id [${objeto.id}] e nome [${objeto.nome}]`));
      })
    );
  }
}
