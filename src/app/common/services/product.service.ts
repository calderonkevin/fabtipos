import { Injectable, Inject } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class ProductService {

    productList: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase){}

    getProduct(){
        return this.productList = this.firebase.list("articulo");

    }

    getCategoria(){
        return this.productList = this.firebase.list("categoria");

    }

    getTienda(){
        return this.productList = this.firebase.list("tienda");

    }

}
