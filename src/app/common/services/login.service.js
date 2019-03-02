"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var global_1 = require("./global");
var LoginService = (function () {
    function LoginService(_http) {
        this._http = _http;
        this.url = global_1.GLOBAL.url;
        this.url2 = global_1.GLOBAL.url2;
    }
    LoginService.prototype.singup = function (email, miclave) {
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        //let params = {username: email , pwd: miclave};
        //let dataString = $(params).serialize();
        var params = 'username=' + email + '&pwd=' + miclave;
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.url + 'login', params, options)
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.singup3 = function (email, miclave) {
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        var params3 = { username: email, pwd: miclave };
        var dataString = JSON.stringify(params3);
        //let dataString = $("#email").serialize();
        var params = 'username=' + email + '&pwd=' + miclave;
        console.log(dataString);
        console.log("=aaa================");
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=UTF-8');        
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.url + 'login', params, options)
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.singup4 = function (email, miclave) {
        console.log("=================");
        console.log(email);
        console.log(miclave);
        console.log("=================");
        var params3 = { username: email, pwd: miclave };
        var dataString = JSON.stringify(params3);
        //let dataString = $("#email").serialize();
        var params = 'username=' + email + '&pwd=' + miclave;
        console.log(dataString);
        console.log("=aaa================");
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=UTF-8');        
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});        
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.url + 'login', dataString, options)
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.articulos = function () {
        console.log("=================");
        //let params = {username: email , pwd: miclave};
        //let dataString = $(params).serialize();
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.url2 + 'catalogo/lista-articulo', options)
            .map(function (res) { return res.json(); });
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map