import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ProductService } from '../common/services/product.service';
import { AttrAst } from '@angular/compiler';
import { CloseScrollStrategy } from '@angular/cdk/overlay';


export interface Producto {
  id: number;
  codpro: string;
  nompro: string;
  cantid: number;
  punituser: number;
  codcol: string;
  descolor: string;
  talla: string;
  serpro: string;
  fecvendet: string;
}

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  invoiceCab = [];
  //invoice = [];
  productObj: Producto;

  constructor(
    private _productService: ProductService
  ) {
  }

  invoItemDelete(item: number): void {
    this.invoice.splice(item, 1);
  }
  invoice = [];
  invoice2: Producto[] = [
    {
      id: 1,
      codpro: "123",
      nompro: "PANTALLA-HTC-DESIRE-100",
      cantid: 1,
      punituser: 10.25,
      codcol: "000001",
      descolor: "TRANSPARENTE",
      talla: "000001",
      serpro: "000011234454119",
      fecvendet: "2019-01-01"
    },
    {
      id: 2,
      codpro: "123",
      nompro: "PANTALLA-HTC-DESIRE-200",
      cantid: 1,
      punituser: 10.25,
      codcol: "000001",
      descolor: "TRANSPARENTE",
      talla: "000001",
      serpro: "000011234454119",
      fecvendet: "2019-01-01"
    },
    {
      id: 3,
      codpro: "123",
      nompro: "PANTALLA-HTC-DESIRE-300",
      cantid: 1,
      punituser: 10.25,
      codcol: "000001",
      descolor: "TRANSPARENTE",
      talla: "000001",
      serpro: "000011234454119",
      fecvendet: "2019-01-01"
    },
    {
      id: 4,
      codpro: "123",
      nompro: "PANTALLA-HTC-DESIRE-400",
      cantid: 1,
      punituser: 10.25,
      codcol: "000001",
      descolor: "VERDE",
      talla: "000001",
      serpro: "000011234454119",
      fecvendet: "2019-01-01"
    },

  ];



  invoGetTotal(): string {
    var total = 0;
    for (let item of this.invoice) {
      total = total + (item.cantid * item.punituser)
    }
    return total.toFixed(2)
  }

  
  buscarFire(searchValue: string): void {
    console.log("hola del boton: " + searchValue);

    
    
    var aRef = this._productService.getIdProducto("aaa").list("listabarra/00080300034604019")
      .snapshotChanges()
      .subscribe(item => {
        //this.productObj = null;
        console.log("Item: "+item);
        //console.log("SubItem: "+item.payload);

        //console.log("Item: "+item.payload.;
        //console.log(item.length);
        //console.log("aaaa: "+item.forEach.);
        var arr = [];
        arr['serpro'] = '00080300034604019';
        item.forEach(element => {
          let x = element.payload.toJSON();
          console.log("key:" + element.key);
          console.log("xxx:" +x);
          arr[element.key] = x; 
          //x["$key"] = element.key;
          var zz = element.payload.toJSON();
          
          //this.productObj.push(x as Producto);
        });
        console.log(arr);
        console.log(arr['serpro']);
        
        this.invoice.push(
          {
            id: 5,
            codpro: "123",
            nompro: "PANTALLA-HTC-DESIRE-100",
            cantid: 1,
            punituser: 10.25,
            codcol: "000001",
            descolor: "TRANSPARENTE",
            talla: "000001",
            serpro: arr['serpro'],
            fecvendet: "2019-01-01"
          }
        )
        ;
        /*
        this.productObj.id = 5;
        this.productObj.serpro = arr['serpro'];
        this.productObj.codpro = arr['codpro'];
        this.productObj.nompro = "F A L T A";
        this.productObj.codcol = arr['codcol'];
        this.productObj.descolor = "F A L T A";
        this.productObj.talla = "F A L T A";
        this.productObj.fecvendet = arr['fecvendet'];
        this.productObj.cantid = arr['cantid'];
        this.productObj.punituser = 0.00;
        
        this.invoice.push(this.productObj as Producto);
        */
      });      
      console.log("Lista: " + this.productObj);
      

  
  }

}
