import { Oferta } from "./shared/oferta.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class OfertasService {

    private url_api = 'http://localhost:3000';

    constructor(private http: HttpClient){}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${this.url_api}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta);
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${this.url_api}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta);
    }

    public getOfertaPorId(id: number): Promise<Oferta>{
        return this.http.get(`${this.url_api}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Promise<Oferta>) => {
                return resposta[0];
            });
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${this.url_api}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0].descricao);
    }

    public getOndeFicaPorId(id: number): Promise<string>{
        return this.http.get(`${this.url_api}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0].descricao);
    }
     
    public pesquisaOfertas(termo: string): Observable<Oferta>{
        return this.http.get(`${this.url_api}/ofertas?descricao_oferta=${termo}`)
            .pipe(map((resposta: any) => resposta));
    }
}