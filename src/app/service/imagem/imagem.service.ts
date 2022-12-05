import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Imagem } from '../../model/imagem.model';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) { }


  obter(uuid?: string): Observable<Imagem[]> {
    return this.http.get<Imagem[]>(`${environment.apiUrl}/imagens?uuid=${uuid}&_sort=posicao&_order=asc`).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar obter a imagem de uuid [${uuid}]`));
      })
    );
  }

  salvar(imagem: Imagem): Observable<Imagem> {
    if (imagem.id) {
      return this.http.put<Imagem>(`${environment.apiUrl}/imagens/${imagem.id}`, imagem).pipe(
        catchError(() => {
          return throwError(() => new Error(`Ocorreu um erro ao tentar atualizar a imagem de id [${imagem.id}] e base64 [${imagem.base64}]`));
        })
      );
    } 
    return this.http.post<Imagem>(`${environment.apiUrl}/imagens`, imagem).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar inserir a imagem de base64 [${imagem.base64}]`));
      })
    );
  }

  excluir(imagem: Imagem): Observable<Imagem> {
    return this.http.delete<Imagem>(`${environment.apiUrl}/imagens/${imagem.id}`).pipe(
      catchError(() => {
        return throwError(() => new Error(`Ocorreu um erro ao tentar excluir a imagem de id [${imagem.id}] e base64 [${imagem.base64}]`));
      })
    );
  }
}
