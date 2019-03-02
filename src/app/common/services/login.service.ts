import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { Observable, Subject, pipe } from 'rxjs';
import { GLOBAL } from './global';


declare var jQuery: any;
declare var $: any;

@Injectable()
export class LoginService{
    public url: string;
    public url2: string;
    public identity: string;
    public token: string;
    public datadef: any;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
        this.url2 = GLOBAL.url2;
    }

    articulos22(){        
        console.log("=================");
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });        
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return this._http.post(this.url2 + 'catalogo/lista-articulo13', options)
                         .pipe(map(res => res.json()));        
                         
    }


    singup(email:string, miclave:string){        
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        //let params = {username: email , pwd: miclave};
        //let dataString = $(params).serialize();
        let params = 'username='+ email  +'&pwd='+ miclave;
        
        console.log(params);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'login', params, options)
                         .pipe(map(res => res.json()));
        
    }

    singup3(email:string, miclave:string){        
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        let params3 = {username: email , pwd: miclave};
        let dataString = JSON.stringify(params3);
        //let dataString = $("#email").serialize();
        let params = 'username='+ email  +'&pwd='+ miclave;
        
        console.log(dataString);
        console.log("=aaa================");
        console.log(params);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});        
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=UTF-8');        
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });
        //return this._http.post(this.url + 'login', params, options)
        //                 .map(res => res.json());
        
    }
    singup4(email:string, miclave:string){        
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        let params3 = {username: email , pwd: miclave};
        let dataString = JSON.stringify(params3);
        //let dataString = $("#email").serialize();
        let params = 'username='+ email  +'&pwd='+ miclave;
        
        console.log(dataString);
        console.log("=aaa================");
        console.log(params);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=UTF-8');        
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });
        //return this._http.post(this.url + 'login', dataString, options)
        //                 .map(res => res.json());
        
    }

    articulos(){        
        console.log("=================");
        //let params = {username: email , pwd: miclave};
        //let dataString = $(params).serialize();
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});        
        let options = new RequestOptions({ headers: headers });        
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//console.log(this._http.post(this.url2 + 'catalogo/lista-articulo', options)
//.pipe(map(res => res.json()))      );
        return this._http.post(this.url + 'articulo/lista13in', options)
                         .pipe(map(res => res.json()));        
                         
    }

    crearTicketPos(body, invoiceCab){
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
        console.log(listaJson);

        
        let headers = new Headers();        
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Authorization", token);

        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});
        //headers = new Headers({ 'Authorization': 'Basic'+ token});        
        let options = new RequestOptions({ headers: headers });                

        return this._http.post(this.url + 'emitir-ticket/add', JSON.stringify(listaJson),  options)
                         .pipe(map(res => res.json()));        
                         
    }

    
    /*public create(route: string, body) {
        console.log( JSON.stringify(body));
    
        console.log(this.createCompleteRoute(route, this.envUrl.urlAddress))    
        return this.http.post("URL", JSON.stringify(body), this.generateHeaders());
      }
    */

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));        
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

    getDataDef(){
        let datadef = JSON.parse(localStorage.getItem('datadef'));        
        if(datadef != "undefined"){
            this.datadef = datadef;
        }else{
            this.datadef = null;
        }
        return this.datadef;
    }


}