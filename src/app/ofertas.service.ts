import { Oferta } from "./shared/oferta.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class OfertasService {

    private url_api = 'http://localhost:3000/ofertas';

    constructor(private http: HttpClient){}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${this.url_api}?destaque=true`)
            .toPromise()
            .then((resposta: Promise<Oferta[]>) => resposta);
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${this.url_api}?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Promise<Oferta[]>) => resposta);
    }

    public getOfertaPorId(id: number): Promise<Oferta>{
        return this.http.get(`${this.url_api}?id=${id}`)
            .toPromise()
            .then((resposta: Promise<Oferta>) => {
                return resposta[0];
            });
    }
}