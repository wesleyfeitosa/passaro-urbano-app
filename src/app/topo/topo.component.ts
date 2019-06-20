import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from "rxjs/operators";
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  public subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa  
    .pipe(
      debounceTime(300), 
      distinctUntilChanged(), //busca se o termo for diferente do anterior
      switchMap((termo: string)=>{
 
        if(termo.trim() === ''){
          //retornar um observable de array de ofertas vazio
          return of([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      }),
      catchError ((erro)=> {
        return of([]);
      })
    )
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca); 
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('');
  }
}
