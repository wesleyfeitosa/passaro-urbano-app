import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime } from "rxjs/operators";
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
      .pipe( debounceTime(1000), switchMap((termo: string) => {
        return this.ofertasService.pesquisaOfertas(termo);
      }
    ));
    this.ofertas.subscribe((ofertas: Oferta[]) => 
      console.log(ofertas));
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca) 
  }
}
