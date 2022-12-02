import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagem } from '../../model/imagem.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) { }

  obter(uuid?: string): Observable<Imagem[]> {
    return this.http.get<Imagem[]>('http://localhost:3000/imagens?uuid=' + uuid);
  }

  salvar(imagem: Imagem): Observable<Imagem> {
    if(imagem.id) {
      return this.http.put<Imagem>('http://localhost:3000/imagens/' + imagem.id, imagem);
    }
    return this.http.post<Imagem>('http://localhost:3000/imagens', imagem);
  }

  excluir(imagem: Imagem): Observable<Imagem> {
    return this.http.delete<Imagem>('http://localhost:3000/imagens/' + imagem.id);
  }
}
