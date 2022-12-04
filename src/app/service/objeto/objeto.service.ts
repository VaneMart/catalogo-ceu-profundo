import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Objeto } from 'src/app/model/objeto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  constructor(private http: HttpClient) { }

  obterUltimo(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(`${environment.apiUrl}/objetos?_sort=data&_order=desc&_limit=1`);
  }

  obter(uuid?: string): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(`${environment.apiUrl}/objetos?uuid=${uuid}&_sort=posicao&_order=asc`);
  }

  salvar(objeto: Objeto): Observable<Objeto> {
    if (objeto.id) {
      return this.http.put<Objeto>(`${environment.apiUrl}/objetos/${objeto.id}`, objeto);
    } 
    return this.http.post<Objeto>(`${environment.apiUrl}/objetos/${objeto.id}`, objeto);
  }

  excluir(objeto: Objeto): Observable<Objeto> {
    return this.http.delete<Objeto>(`${environment.apiUrl}/objetos/${objeto.id}`);
  }
}
