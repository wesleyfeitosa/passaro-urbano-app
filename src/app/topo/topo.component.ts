import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject } from 'rxjs';
import { switchMap } from "rxjs/operators";
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
      .pipe(switchMap((termo: string) => {
        return this.ofertasService.pesquisaOfertas()
      }));
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next()
  }
}
