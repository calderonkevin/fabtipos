import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';


declare var jQuery: any;
declare var $: any;

@Injectable()
export class LoginService {
    public url: string;
    public url2: string;
    public url3: string;
    public identity: string;
    public token: string;
    public datadef: any;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.url2 = GLOBAL.url2;
        this.url3 = GLOBAL.url3;
    }

    articulos22() {
        console.log("=================");
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return this._http.post(this.url2 + 'catalogo/lista-articulo13', options)
            .pipe(map(res => res.json()));

    }


    singup(email: string, miclave: string) {
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        //let params = {username: email , pwd: miclave};
        //let dataString = $(params).serialize();
        let params = 'username=' + email + '&pwd=' + miclave;

        console.log("0001-" + params);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'login', params, options)
            .pipe(map(res => res.json()));

    }

    singup3(email: string, miclave: string) {
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        let params3 = { username: email, pwd: miclave };
        let dataString = JSON.stringify(params3);
        //let dataString = $("#email").serialize();
        let params = 'username=' + email + '&pwd=' + miclave;

        console.log(dataString);
        console.log("=aaa================");
        console.log(params);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=UTF-8');        
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });
        //return this._http.post(this.url + 'login', params, options)
        //                 .map(res => res.json());

    }
    singup4(email: string, miclave: string) {
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        let params3 = { username: email, pwd: miclave };
        let dataString = JSON.stringify(params3);
        //let dataString = $("#email").serialize();
        let params = 'username=' + email + '&pwd=' + miclave;

        console.log(dataString);
        console.log("=aaa================");
        console.log(params);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=UTF-8');        
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });
        //return this._http.post(this.url + 'login', dataString, options)
        //                 .map(res => res.json());

    }

    articulos(searchValue: string) {

        console.log("=================");
        let params = 'searchValue=' + searchValue;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'articulo/lista12', params, options)
            .pipe(map(res => res.json()));


    }

    clientes() {

        console.log("=================");
        let params = '';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'cliente/get-pairs', params, options)
            .pipe(map(res => res.json()));


    }

    motivoCombo() {

        console.log("=================");
        let params = '';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'motivo/get-pairs', params, options)
            .pipe(map(res => res.json()));


    }

    listaTicket(searchValue: string) {

        var listaJson = [];
        var token = this.getToken();
        var identity = this.getIdentity();
        listaJson = [
            {
                "token": token,
                "identity": identity,
            }
        ];
        console.log("listaJson:" + listaJson);

        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'ticket/lista-json', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }

    listaTicketDet(searchValue: string) {

        var listaJson = [];
        var token = this.getToken();
        var identity = this.getIdentity();
        listaJson = [
            {
                "token": token,
                "identity": identity,
            }
        ];
        console.log("listaJson:" + listaJson);

        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'ticket/lista-det-json', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }

    listaTransferenciaDet(searchValue: string) {

        var listaJson = [];
        var token = this.getToken();
        var identity = this.getIdentity();
        listaJson = [
            {
                "token": token,
                "identity": identity,
            }
        ];
        console.log("listaJson:" + listaJson);

        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'transferencia/lista-det-json', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }

    consultaRegVentaDetalle(searchValue: string) {

        var listaJson = [];
        var token = this.getToken();
        var identity = this.getIdentity();
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "search": searchValue
            }
        ];
        console.log("listaJson:" + listaJson);

        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'emitir-devolucion/consulta-reg-venta-detalle-json', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }
    



    crearTicketPos(body, invoiceCab) {
        //let aa =body;  
        console.log("=================");
        console.log("creando nuevo ticket");
        var listaJson = [];
        //var dataCab = [{'codcli':'5','coddir':'0001','codper':'44001713'}];
        var dataCab = invoiceCab;
        var token = this.getToken();
        var identity = this.getIdentity();
        console.log(token);
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "data": body,
                "dataCab": dataCab
            }
        ];
        console.log("listaJson:" + listaJson);


        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'emitir-ticket/add', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }

    crearTransferenciaPos(body, invoiceCab) {
        //let aa =body;  
        console.log("=================");
        console.log("creando nuevo Transferencia");
        var listaJson = [];
        //var dataCab = [{'codcli':'5','coddir':'0001','codper':'44001713'}];
        var dataCab = invoiceCab;
        var token = this.getToken();
        var identity = this.getIdentity();
        console.log(token);
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "data": body,
                "dataCab": dataCab
            }
        ];
        console.log("listaJson:" + listaJson);


        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'emitir-transferencia/add', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }

    crearDevolucionPos(body, invoiceCab) {
        //let aa =body;  
        console.log("=================");
        console.log("creando nuevo Devolucion");
        var listaJson = [];
        //var dataCab = [{'codcli':'5','coddir':'0001','codper':'44001713'}];
        var dataCab = invoiceCab;
        var token = this.getToken();
        var identity = this.getIdentity();
        console.log(token);
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "data": body,
                "dataCab": dataCab
            }
        ];
        console.log("listaJson:" + listaJson);


        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'emitir-devolucion/add', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }


    /*public create(route: string, body) {
        console.log( JSON.stringify(body));
    
        console.log(this.createCompleteRoute(route, this.envUrl.urlAddress))    
        return this.http.post("URL", JSON.stringify(body), this.generateHeaders());
      }
    */

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getDataDef() {
        let datadef = JSON.parse(localStorage.getItem('datadef'));
        if (datadef != "undefined") {
            this.datadef = datadef;
        } else {
            this.datadef = null;
        }
        return this.datadef;
    }

    consultaArticuloBarraAjuIng(busqueda: string) {
        //let aa =body;  
        console.log("=================");
        console.log("consulta producto barra: " + busqueda);
        var listaJson = [];
        //var dataCab = [{'codcli':'5','coddir':'0001','codper':'44001713'}];        
        var token = this.getToken();
        var identity = this.getIdentity();
        console.log(token);
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "data": busqueda,
            }
        ];
        console.log("listaJson:" + listaJson);


        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'articulo/consulta-barra-aju-ing', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }


    listaValidaBarraJson(dataDev: any) {
        //let aa =body;  
        console.log("=================");
        console.log("listaValidaBarraJson: " + dataDev);
        var listaJson = [];
        //var dataCab = [{'codcli':'5','coddir':'0001','codper':'44001713'}];        
        var token = this.getToken();
        var identity = this.getIdentity();
        console.log(token);
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "data": dataDev,
            }
        ];
        console.log("listaJson:" + listaJson);


        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'articulo/lista-valida-barra-json', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }

    consultaRucClienteExterno(selectedTipoDocValue: string, numdoc: string) {
        if(selectedTipoDocValue == "RUC"){
            let params = 'nruc=' + numdoc;
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
            let options = new RequestOptions({ headers: headers });
            return this._http.post(this.url3 + 'consulta-externa/consultaruc/sunat/consulta.php', params, options)
                .pipe(map(res => res.json()));
        }else{
            let params = 'ndni=' + numdoc;
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
            let options = new RequestOptions({ headers: headers });
            return this._http.post(this.url3 + 'consulta-externa/datos-peru-master/example/consulta_perzonalizada.php', params, options)
                .pipe(map(res => res.json()));
        }

    }

    consultaRucClienteInterno(numdoc: string) {
        //let aa =body;  
        console.log("=================");
        console.log("consultaRucClienteInterno: " + numdoc);
        var listaJson = [];        
        var token = this.getToken();
        var identity = this.getIdentity();
        console.log(token);
        listaJson = [
            {
                "token": token,
                "identity": identity,
                "numdoc": numdoc,
            }
        ];
        console.log("listaJson:" + JSON.stringify(listaJson));


        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + 'cliente/consulta-ruc-dni-json', JSON.stringify(listaJson), options)
            .pipe(map(res => res.json()));

    }


}