import { Component, OnInit, TemplateRef } from '@angular/core';

import { GLOBAL } from '../common/services/global';
import { LoginService } from '../common/services/login.service';
import { ProductService } from '../common/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

// model
import { Product } from '../models/product';
import { Ticket } from '../models/ticket';

export interface Section {
  name: string;

}


const ELEMENT_DATA: Ticket[] = [];


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [LoginService]
})
export class CatalogComponent implements OnInit {

  productList: Product[];
  ticketList: Ticket[];
  identity: any;
  invoiceCab = [];
  codError: number;
  msgError: string;
  status: string;
  totalProduct: number;
  totalTicketVenta: string;

  displayedColumns: string[] = ['dessucursal', 'numcodope', 'serie', 'total', 'fecdoc', 'fabrica', 'desfabrica', 'feccre','usernamecre'];
  dataSource = ELEMENT_DATA;

  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _productService: ProductService
  ) {
  }

  ngOnInit() {

    // console.log(this.headerComponent.descuento);
    /*
    this._productService.getProduct()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        //console.log(item.length);
        item.forEach(element => {
          let x = element.payload.toJSON();
          //console.log(element.key);
          x["$key"] = element.key;
          //console.log(element.key);
          this.productList.push(x as Product);
        });
      });
      */

    this.identity = this._loginService.getIdentity();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit CATALOGO");
    console.log(this._loginService.getDataDef());

    this.loadTicket(this.identity);

  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/']);
  }

  products: Section[] = [
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },

  ];

  loadCatalogo(searchValue: string) {
    console.log("loadCatalogo");

    this.codError = -999;
   
      this._loginService.articulos(searchValue).subscribe(
        response => {
          console.log("L I S T A   D E   P R O D U C T O S");
          console.log(response);
          this.codError = response.code;
          this.msgError = response.msg;
          this.productList = response.data;
          this.totalProduct = this.productList.length;
          //console.log(this.productList.length);

          if (this.codError == 0) {

            this.status = "success";

          } else {
            this.status = "danger";
          }

        },
        error => {
          console.log(<any>error);
          //console.log("error 454545.");
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.codError = -1;
          }
        }
      )
 

  }


  
  loadTicket(searchValue: string) {
    console.log("loadTicket");

    this.codError = -999;
   
      this._loginService.listaTicket(searchValue).subscribe(
        response => {
          console.log("L I S T A   D E   T I C K E T");
          console.log(response);
          this.codError = response.code;
          this.msgError = response.msg;
          this.dataSource = response.data;
          console.log("this.ticketList:" + this.ticketList);

          this.totalTicketVenta = this.ticketGetTotal();
          
          //this.totalProduct = this.productList.length;
          //console.log(this.productList.length);

          if (this.codError == 0) {

            this.status = "success";

          } else {
            this.status = "danger";
          }

        },
        error => {
          console.log(<any>error);
          //console.log("error 454545.");
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.codError = -1;
          }
        }
      )
 

  }

  ticketGetTotal(): string {
    var total = 0;
    for (let item of this.dataSource) {
      total = total + (item.total * 1)
    }    
    return total.toFixed(2)
  }
}
