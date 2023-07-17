import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado)
    return this.http.get<LivrosResultado>(this.API, { params })
    //.pipe(
      //tap(retornoAPI => console.log('Fluxo do tap', retornoAPI)),
     // map(resultado => resultado.items ?? []),
      //tap(resultado => console.log('Fluxo após o map', resultado)))
  }
}
