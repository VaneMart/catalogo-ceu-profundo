import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagem } from '../../model/imagem.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) { }

  obter(uuid?: string): Observable<Imagem[]> {
    return this.http.get<Imagem[]>(`${environment.apiUrl}/imagens?uuid=${uuid}&_sort=posicao&_order=asc`);
  }

  salvar(imagem: Imagem): Observable<Imagem> {
    if (imagem.id) {
      return this.http.put<Imagem>(`${environment.apiUrl}/imagens/${imagem.id}`, imagem);
    } 
    return this.http.post<Imagem>(`${environment.apiUrl}/imagens/${imagem.id}`, imagem);
  }

  excluir(imagem: Imagem): Observable<Imagem> {
    return this.http.delete<Imagem>(`${environment.apiUrl}/imagens/${imagem.id}`);
  }
}
