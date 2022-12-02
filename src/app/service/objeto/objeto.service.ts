import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Objeto } from 'src/app/model/objeto.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  constructor(private http: HttpClient) { }

  obterUltimoObjeto(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>('http://localhost:3000/objetos?_sort=data&_order=desc&_limit=1');
  }

  obter(uuid?: string): Observable<Objeto[]> {
    return this.http.get<Objeto[]>('http://localhost:3000/objetos?uuid=' + uuid);
  }

  salvar(objeto: Objeto): Observable<Objeto> {
    if(objeto.id) {
      return this.http.put<Objeto>('http://localhost:3000/objetos/' + objeto.id, objeto);
    } 
    return this.http.post<Objeto>('http://localhost:3000/objetos', objeto);
  }

  excluir(objeto: Objeto): Observable<Objeto> {
    return this.http.delete<Objeto>('http://localhost:3000/objetos/' + objeto.id);
  }
}
