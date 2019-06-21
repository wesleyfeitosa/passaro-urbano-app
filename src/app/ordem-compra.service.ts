import { Pedido } from "./shared/pedido.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';

@Injectable()
export class OrdemCompraService{

    private url_api = 'http://localhost:3000';
    
    constructor(private http: HttpClient){ }
    
    public efetivarCompra(pedido: Pedido): Observable<number>{
        
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${this.url_api}/pedidos`,
             (pedido),
             ({headers: headers})
        )
        .pipe(map((resposta: Response) => resposta['id']));
    }
}