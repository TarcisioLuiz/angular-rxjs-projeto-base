import { Item } from './../../models/interfaces';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';

const PAUSA = 300

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl()
  mensagemErro = ''

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      this.mensagemErro = 'Ops ocorreu um erro, Recarregue a aplicação'
      return EMPTY
      //console.log(erro)
      //return throwError(() => new Error(this.mensagemErro = 'Ops ocorreu um erro, Recarregue a aplicação'))
  })
    )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}



