import { Component, OnInit } from '@angular/core';

import { LoginService } from '../common/services/login.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

// model
import { Product } from '../models/product';
import { Ticket } from '../models/ticket';
import { Ticketdet } from '../models/ticketdet';
import { Transferenciadet } from '../models/transferenciadet';


const ELEMENT_VENTA: Ticket[] = [];
const ELEMENT_VENTADET: Ticketdet[] = [];
const ELEMENT_TRANSFERENCIADET: Transferenciadet[] = [];


@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css'],
  providers: [LoginService]
})
export class Product2Component implements OnInit {

  url3: string = "";
  menuTipcodope:string;
  menuDesTipcodope:string;
  itemDevolucion: any;

  productList: Product[];
  ticketDetList: Ticketdet[];
  ticketList: Ticket[];
  identity: any;
  invoiceCab = [];
  dataDef = [];
  codError: number;
  msgError: string;
  status: string;
  totalProduct: number;
  totalTicketVenta: string;
  totalTicketDetVenta: string;  

  displayedColumnsVenta: string[] = ['dessucursal', 'serie', 'numdoc', 'nomcom', 'total', 'feccre', 'symbol'];
  //displayedColumnsVenta: string[] = ['dessucursal'];
  displayedColumnsVentaDet: string[] = ['dessucursal', 'serienumref', 'numref', 'punit', 'fchdoc', 'serpro', 'nompro','descolor', 'nomcom', 'feccre', 'symbol'];
  displayedColumnsTransferencia: string[] = ['dessucursal', 'dessucref','numcodope','fchdoc', 'serpro', 'nompro','descolor', 'feccre'];
  dataSourceVenta = ELEMENT_VENTA;
  dataSourceVentaDet = ELEMENT_VENTADET;
  dataSourceTransferencia = ELEMENT_TRANSFERENCIADET;

  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService    
  ) {
  }

  ngOnInit() {
    
    this.url3 = this._loginService.url3;

    this.identity = this._loginService.getIdentity();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.dataDef = this._loginService.getDataDef();
    console.log("entra a oninit CATALOGO");
    console.log(this._loginService.getDataDef());

    this.loadTicket(this.identity);
    //this.loadTicketDet(this.identity);
    this.loadTransferenciaDet(this.identity);    

  }
  verDatosMenu(event){
    console.log("MIS DATOS OUT");
    console.log(event);
    this.menuTipcodope = event.menuTipcodope;
    this.menuDesTipcodope = event.menuDesTipcodope;    
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/']);
  }

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
          this.dataSourceVenta = response.data;
          console.log("this.dataSourceVenta:" + this.dataSourceVenta);

          this.totalTicketVenta = this.ticketGetTotal();          

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

  loadTicketDet(searchValue: string) {
    console.log("loadTicketDet");

    this.codError = -999;
   
      this._loginService.listaTicketDet(searchValue).subscribe(
        response => {
          console.log("L I S T A   D E   T I C K E T   D E T A L L E");
          console.log(response);
          this.dataSourceVentaDet = response.data;
          console.log("this.dataSourceVentaDet:" + this.dataSourceVentaDet);

          this.totalTicketDetVenta = this.ticketDetGetTotal();          

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

  loadTransferenciaDet(searchValue: string) {
    console.log("loadTransferenciaDet");

    this.codError = -999;
   
      this._loginService.listaTransferenciaDet(searchValue).subscribe(
        response => {
          console.log("L I S T A   D E   T R A N S F E R E N C I A   D E T A L L E");
          console.log(response);
          this.dataSourceTransferencia = response.data;          

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
    for (let item of this.dataSourceVenta) {
      total = total + (item.total * 1);      
    }    
    
    return total.toFixed(2)
  }

  ticketDetGetTotal(): string {
    var total = 0;
    for (let item of this.dataSourceVentaDet) {
      total = total + (item.punit * item.cantid)
    }    
    return total.toFixed(2)
  }

  reImprimirVenta(sucursal, numcodope) : void {
    console.log("imprime " + sucursal);
    console.log("imprime " +  numcodope);

    this._loginService.reImpresionTicketPos(sucursal, numcodope).subscribe(
      response => {
        console.log(response);
        

        if (response.r1 == 0) {          
          
          var impText = [{ 'invoicecab': response.dataCab, 'invoice': response.dataDet, }];
          var dataEnconde = btoa(JSON.stringify(impText));
          console.log("convertido");
          console.log(dataEnconde);          
          //window.open(this.invoiceCab["rutaimp"]+ 'docTicket.php?imp=' + dataEnconde, 'iframeImpresion');
          window.open('http://localhost/escpos-impresion-dona/example/docDocu.php?imp=' + dataEnconde, 'iframeImpresion');
          console.log("FIN L L A M A   I M P R E S I O N ");


        } 

        //finaliza
        
        
      },
      error => {
        console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR .");

        //console.log(<any>error);

        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(errorMessage._body);

        }

        //this.toastr.error(errorMessage, 'Venta');
      })

  }

  agregarProductoVenta02(item){
    alert(222);  
  }
  
}
