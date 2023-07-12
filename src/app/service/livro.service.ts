import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string) {
    const params = new HttpParams().append('q', valorDigitado)
    return this.http.get(this.API, { params })
  }
}
