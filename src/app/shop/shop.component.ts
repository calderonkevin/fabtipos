import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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

  invoItemDelete(item: number): void {
    this.invoice.splice(item, 1);
  }

  invoice: Producto[] = [
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

}
