import { Component, OnInit } from '@angular/core';

import { LoginService } from '../common/services/login.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http'; 

import { MatDialog } from '@angular/material';

// model
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Ticket } from '../models/ticket';
import { Ticketdet } from '../models/ticketdet';
import { Transferenciadet } from '../models/transferenciadet';

import { ProductService } from '../common/services/product.service';
import { Devolucion } from '../models/devolucion';

//Dialog
import { MyDialogVentaDetalleComponent } from '../my-dialog-venta-detalle/my-dialog-venta-detalle.component';


//import { ShopComponent } from '../shop/shop.component';

declare var jQuery: any;
declare var $: any;


const ELEMENT_VENTA: Ticket[] = [];
const ELEMENT_VENTADET: Ticketdet[] = [];
const ELEMENT_TRANSFERENCIADET: Transferenciadet[] = [];
const ELEMENT_DEVOLUCION: Devolucion[] = [];



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [LoginService]
})
export class CatalogComponent implements OnInit {

  highlightedRows = [];

  lblVisaText: string = "";
  
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

  listacaja : any;
  listacaja2 : any;
  
  categoriaList: Category[];

  displayedColumnsVenta: string[] = ['dessucursal', 'formapago', 'serie', 'numdoc', 'nomcom', 'total', 'feccre', 'icondet', 'symbol'];
  //displayedColumnsVenta: string[] = ['dessucursal'];
  displayedColumnsVentaDet: string[] = ['dessucursal', 'serienumref', 'numref', 'punit', 'fchdoc', 'serpro', 'nompro','descolor', 'nomcom', 'feccre', 'symbol'];
  displayedColumnsTransferencia: string[] = ['dessucursal', 'dessucref','numcodope','fchdoc', 'serpro', 'nompro','descolor', 'feccre'];
  displayedColumnsDevolucion: string[] = ['dessucursal', 'serie', 'numdoc', 'nomcom', 'total', 'codvale' , 'feccre' , 'symbol'];
  dataSourceVenta = ELEMENT_VENTA;
  dataSourceVentaDet = ELEMENT_VENTADET;
  dataSourceTransferencia = ELEMENT_TRANSFERENCIADET;
  dataSourceDevolucion = ELEMENT_DEVOLUCION;

  totEfectivo: number = 0.00;
  totVisa: number = 0.00;
  totMaster: number = 0.00;
  totAmex: number = 0.00;
  totDinner: number = 0.00;
  totVale: number = 0.00;
    
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _productService: ProductService,
    private _http: Http,
    public dialog: MatDialog,
    //private shopComponent: ShopComponent, 
  ) {
  }

  ngOnInit() {
    
    this.url3 = this._loginService.url3;

    this.identity = this._loginService.getIdentity();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.dataDef = this._loginService.getDataDef();
    console.log("entra a oninit CATALOGO");
    console.log(this._loginService.getDataDef());

    if(this.dataDef['tiposerpro'] == 3){
      this.lblVisaText= "Bancos (depo-trans-pos)";
    }
    else{
      this.lblVisaText= "Visa";
    }
    
    this.loadTicket(this.identity);
    //this.loadTicketDet(this.identity);
    this.loadTransferenciaDet(this.identity);    
    this.loadDevolucion();

    this._productService.getCategoria()
      .snapshotChanges()
      .subscribe(item => {
        this.categoriaList = [];
        //console.log(item.length);
        item.forEach(element => {
          let x = element.payload.toJSON();
          //console.log(element.key);
          x["$key"] = element.key;
          //console.log(element.key);
          this.categoriaList.push(x as Category);
        });
      });

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

  loadDevolucion() {
    console.log("loadTicket");

    this.codError = -999;
   
      this._loginService.listaDevolucion().subscribe(
        response => {
          console.log("L I S T A   D E   D E V O L U C I O N");
          console.log(response);
          this.dataSourceDevolucion = response.data;
          console.log("this.dataSourceDevolucion:" + this.dataSourceDevolucion);

          //this.totalTicketVenta = this.ticketGetTotal();          

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
          //var dataEnconde = btoa(JSON.stringify(impText));
          console.log("==============================================================");
          console.log("==============================================================");
          console.log("SIN CONVERTIR " + impText);
          console.log("==============================================================");
          console.log("==============================================================");
          //console.log("convertido");
          //console.log(dataEnconde);          
          if(response.dataCab.tipcodope == "0011" || response.dataCab.tipcodope == "0012")
          {
            //var body = "imp=" + dataEnconde + "&lastname=" + user.lastname + "&name=" + user.name;
            //var body = "imp=" + dataEnconde;
            //this._http.post(this.dataDef["rutaimp"] + 'docDocu.php', body).subscribe((data) => {
            //  console.log("data");
            //  console.log(data);
            //});
            $.post( this.dataDef["rutaimp"] + 'docDocu.php', { imp: impText } );

              //window.open(this.dataDef["rutaimp"] + 'docDocu.php?imp=' + dataEnconde, 'iframeImpresion');
          }
          else
          {
            if(this.dataDef["tiposerpro"] == 1){
              $.post( this.dataDef["rutaimp"] + 'docDocu.php', { imp: impText } );  
            }else{
                $.post( this.dataDef["rutaimp"] + 'docTicket.php', { imp: impText } );
            }          
            //window.open(this.dataDef["rutaimp"] + 'docTicket.php?imp=' + dataEnconde, 'iframeImpresion');
          }
          //window.open(this.invoiceCab["rutaimp"]+ 'docTicket.php?imp=' + dataEnconde, 'iframeImpresion');
          //docDocu.php
          //window.open('http://localhost/escpos-impresion-dona/example/docDocu.php?imp=' + dataEnconde, 'iframeImpresion');
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

  reImprimirDevolucion(sucursal, numcodope) : void {
    console.log("imprime " + sucursal);
    console.log("imprime " +  numcodope);

    this._loginService.reImpresionDevolucionPos(sucursal, numcodope).subscribe(
      response => {
        console.log(response);
        

        if (response.r1 == 0) {          
          
          var impText = [{ 'invoicecab': response.dataCab, 'invoice': response.dataDet, }];
          var dataEnconde = btoa(JSON.stringify(impText));
          console.log("convertido");
          console.log(dataEnconde);          
          $.post( this.dataDef["rutaimp"] + 'docDevol.php', { imp: dataEnconde } );          
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

  agregarProductoVenta(item){
    
    if(this.dataDef['tiposerpro'] != 1){
      return;
    }

    //alert($("#detectabarra")[0].disabled);
    if($("#detectabarra")[0].disabled){
      return;
    }
    $("#detectabarra").val(item.serpro);
    $("#detectabarra2").click();
    //$("#detectabarra").buscarFire(item.serpro);
    //$('#detectabarra').trigger(jQuery.Event('keypress', { keycode: 13 }));
    //var e = jQuery.Event( "enter" ); 
    //var e = jQuery.Event( "keydown", { keyCode: 13 } );
    // trigger an artificial click event
    //jQuery( "#detectabarra" ).trigger( e );
    //alert(e);
    console.log(item.serpro);
    //console.log(e);
    
    
  }

  actualizarDetalle() {    
    

    this._loginService.getCierreUsuario().subscribe(
      response => {
        this.listacaja = response.data;
        this.listacaja2 = response.data2;
        console.log(response);
        this.calcularCajaMontos();

      });
  }

  calcularCajaMontos() {

    var wtotEfectivo = 0.00;
    var wtotVisa = 0.00;
    var wtotMaster = 0.00;
    var wtotAmex = 0.00;
    var wtotDinner = 0.00;
    var wtotVale = 0.00;
    console.log("this.listacaja:" + this.listacaja[4004000001].importe)
    /*
    for (let item of this.listacaja) {
      console.log("item: " + item.importe)
      if(item.cod == '4004000001' )
        wtotEfectivo = wtotEfectivo + (item.importe * 1);      
    }
    */

    this.totEfectivo = 
    (this.listacaja[4004000001].importe * 1) -
    (this.listacaja[5005000001].importe * 1) +
    (this.listacaja[6006000001].importe * 1)
     ;

    this.totVisa = 
    (this.listacaja[4004000002].importe * 1) -
    (this.listacaja[5005000002].importe * 1) +
    (this.listacaja[6006000002].importe * 1)
     ;

    this.totMaster  = 
    (this.listacaja[4004000003].importe * 1) -
    (this.listacaja[5005000003].importe * 1) +
    (this.listacaja[6006000003].importe * 1)
     ;
     

     

  }


  openDialogVentaDetalle( element): void {

    let dialogRefDes = this.dialog.open(MyDialogVentaDetalleComponent, {
      width: '900px',
       data: { element: element}
      //data: ''      
    });

    dialogRefDes.afterClosed().subscribe(result => {
      //alert(result);
      if (result != "") {        
        
        console.log(result);
      }      
      
    });
  }
  
}
