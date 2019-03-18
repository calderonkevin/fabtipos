import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

//model
import { Productbarcode } from '../models/productbarcode';
import { Invoicedet } from '../models/invoicedet';
import { Tienda } from '../models/tienda';

//service
import { LoginService } from '../common/services/login.service';
import { ProductService } from '../common/services/product.service';

//toastr
import { ToastrService } from 'ngx-toastr';

//Dialog
import { MyDialogEditarPrecioComponent } from '../my-dialog/my-dialog-editar-precio.component';

declare var jQuery: any;
declare var $: any;

export interface Food2 {
  value: string;
  viewValue: string;
}

export interface Ciente {
  codcli: string;
  nomcom: string;
}


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [LoginService]
})
export class ShopComponent {  

  
  clientes: Ciente[];
  
  


  tiendaList: Tienda[];

  constructor(
    private _loginService: LoginService,
    private _productService: ProductService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {

  }

  invoiceId: number = 0;
  invoiceCab = [];
  invoiceDet = [];
  tmpInvoiceDet: Invoicedet;
  loading = false;
  loadingprecio = false;
  jsonImpresion: string;
  clienteListCombo = [];  

  productObj: Productbarcode;
  productBarcodeList: Productbarcode[];

  searchValue: string = "";

  tipcodope: string = "0090";
  sucursal: string = "";
  identity: any;
  selectedCodcliValue: string;

  ngOnInit() {

    this._loginService.clientes().subscribe(
      response => {
        console.log("L I S T A   D E   C L I E N T E S");
        console.log(response);
        this.clientes = response.data;  
      },
      error => {
        console.log(<any>error);
        //console.log("error 454545.");
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);          
        }
      }
    )


    let wTienda = this._productService.getTienda()
      .snapshotChanges()
      .subscribe(item => {

        wTienda.unsubscribe();

        this.tiendaList = [];
        //console.log(item.length);
        item.forEach(element => {
          let x = element.payload.toJSON();
          //console.log(element.key);
          x["$key"] = element.key;
          //console.log(element.key);
          this.tiendaList.push(x as Tienda);
        });
      });

    this.identity = this._loginService.getIdentity();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit de SHOP ");
    console.log("this.identity: " + this.identity);
    console.log("this.invoiceCab: " + this.invoiceCab);
    console.log(this._loginService.getDataDef());
    this.sucursal = this.invoiceCab['sucursal'];
    this.selectedCodcliValue = this.invoiceCab['codcli'];
    
    if (this.sucursal == null)
    {
      this.sucursal = "";
    }

  }

  invoItemDelete(item: number): void {
    console.log("borrando: " + item);
    this.invoiceDet.splice(item, 1);
  }

  invoGetTotal(): string {
    var total = 0;
    for (let item of this.invoiceDet) {
      total = total + (item.cantid * item.punituser)
    }    
    return total.toFixed(2)
  }

  //consultaArticuloBarraAjuIng

  buscarFirePreueba(wsearchValue): void {
    this.searchValue = wsearchValue;
    $("#detectabarra").select();
    
    this._loginService.consultaArticuloBarraAjuIng(this.searchValue).subscribe(
      response => {
        console.log(response);
        console.log("cargar link");

        if (response.r1 == 0) {
          this.toastr.info("BIEN", 'Venta');
        
        } else {
          this.toastr.error(response.r4, 'Venta');
        }
        
      },
      error => {
        this.loading = false;
        this.toastr.error("Ha ocurrido un error", 'CONSULTA DE BARRA');
        console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR .");
        
        //console.log(<any>error);
        
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(errorMessage._body);

        }        
        //this.toastr.error(errorMessage, 'Venta');
      })

  }

  buscarFire(wsearchValue): void {

    //this.searchValue = $("#detectabarra").val();
    this.searchValue = wsearchValue;
    $("#detectabarra").select();

    console.log("ESTO VIENE DEL TEXTO:" + this.searchValue);
    console.log("ESTO VIENE DE SUCURSAL:" + this.sucursal + "---");
    
    if (this.tipcodope == "") {
      this.toastr.warning('Falta selecctionar Tipo de Operación');
      return;
    }

    if (this.sucursal == "") {
      this.toastr.warning('Falta Configurar Tienda');
      return;
    }

    if (this.searchValue == "") {
      this.toastr.warning('Ingrese dato a buscar');
      return;
    }

    if (this.invoiceDet.filter(obj => obj.serpro == this.searchValue).length > 0) {
      this.toastr.warning('Existe duplicado del Código de barras.');
      return;
    }

    console.log("INGRESA:" + this.searchValue);
    //let subscription = this._productService.getProductBarCode(this.searchValue)
    //  .snapshotChanges()
    //  .subscribe(item => {
    //    subscription.unsubscribe();
    this._loginService.consultaArticuloBarraAjuIng(this.searchValue).subscribe(
      response => {
    
        console.log("DENTRO TIENE EL VALOR DE:" + this.searchValue);
        this.productBarcodeList = [];
        var item = response.data;
        console.log("item: "+ item);
        console.log("item.length" + item.length);        

        item.forEach(element => {
          var x = element;
          //console.log(element.key);
          x["$key"] = element.serpro;
          //console.log(element.key);
          this.productBarcodeList.push(x as Productbarcode);          
          console.log("lista de this.productBarcodeList:" + this.productBarcodeList);

        });
        console.log("cantidad se esta ejecutando solo: " + this.productBarcodeList.filter(obj => obj.cantid < 0).length);
        if (this.productBarcodeList.filter(obj => obj.cantid > 0).length === 0) {
          this.toastr.error('No existe codigo de barras: ' + this.searchValue);
          return;
        }

        var indSelect = this.productBarcodeList.filter(obj => obj.sucursal == this.sucursal && obj.cantid > 0)
        if (indSelect.length === 1) {

          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal : this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: 1,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet
          };

          this.addInvoiceDet(this.tmpInvoiceDet);
          //this.toastr.info('SE AGREGA DEL MISMO ALMACEN: ' + this.searchValue);
          return;
        }
        //else{
        //  this.toastr.error('No exsiste producto en el almacen seleccionado: ' + this.searchValue);
        //  return;
        //}

        var indSelect = this.productBarcodeList.filter(obj => obj.sucursal != this.sucursal && obj.cantid > 0)
        if (indSelect.length > 0) {

          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal : this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: 1,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet
          };

          this.addInvoiceDet(this.tmpInvoiceDet);

          this.toastr.info('Se trae de otra Tienda: ' + this.getTiendaDestab(indSelect[0].sucursal) );
          return;
        }

        this.toastr.error('P A S A N D O    E S T O    E S T A   M A L');


      });

  }

  buscarFireAnterirorConFire(wsearchValue): void {

    //this.searchValue = $("#detectabarra").val();
    this.searchValue = wsearchValue;
    $("#detectabarra").select();

    console.log("ESTO VIENE DEL TEXTO:" + this.searchValue);
    console.log("ESTO VIENE DE SUCURSAL:" + this.sucursal + "---");
    
    if (this.tipcodope == "") {
      this.toastr.warning('Falta selecctionar Tipo de Operación');
      return;
    }

    if (this.sucursal == "") {
      this.toastr.warning('Falta Configurar Tienda');
      return;
    }

    if (this.searchValue == "") {
      this.toastr.warning('Ingrese dato a buscar');
      return;
    }

    if (this.invoiceDet.filter(obj => obj.serpro == this.searchValue).length > 0) {
      this.toastr.warning('Existe duplicado del Código de barras.');
      return;
    }

    console.log("INGRESA:" + this.searchValue);
    let subscription = this._productService.getProductBarCode(this.searchValue)
      .snapshotChanges()
      .subscribe(item => {
        subscription.unsubscribe();
        console.log("DENTRO TIENE EL VALOR DE:" + this.searchValue);
        this.productBarcodeList = [];
        console.log(item.length);
        console.log("length" + item.length);
        item.forEach(element => {
          var x = element.payload.toJSON();
          //console.log(element.key);
          x["$key"] = element.key;
          //console.log(element.key);
          this.productBarcodeList.push(x as Productbarcode);

        });
        console.log("cantidad se esta ejecutando solo: " + this.productBarcodeList.filter(obj => obj.cantid < 0).length);
        if (this.productBarcodeList.filter(obj => obj.cantid > 0).length === 0) {
          this.toastr.error('No existe codigo de barras: ' + this.searchValue);
          return;
        }

        var indSelect = this.productBarcodeList.filter(obj => obj.sucursal == this.sucursal && obj.cantid > 0)
        if (indSelect.length === 1) {

          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal : this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: 1,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet
          };

          this.addInvoiceDet(this.tmpInvoiceDet);
          //this.toastr.info('SE AGREGA DEL MISMO ALMACEN: ' + this.searchValue);
          return;
        }
        //else{
        //  this.toastr.error('No exsiste producto en el almacen seleccionado: ' + this.searchValue);
        //  return;
        //}

        var indSelect = this.productBarcodeList.filter(obj => obj.sucursal != this.sucursal && obj.cantid > 0)
        if (indSelect.length > 0) {

          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal : this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: 1,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet
          };

          this.addInvoiceDet(this.tmpInvoiceDet);

          this.toastr.info('Se trae de otra Tienda: ' + this.getTiendaDestab(indSelect[0].sucursal) );
          return;
        }

        this.toastr.error('P A S A N D O    E S T O    E S T A   M A L');


      });

  }

  public getTiendaDestab(idsucursal) {
    var desTienda = "";
    var indTienda = this.tiendaList.filter(obj => obj.$key.padStart(6, '0') == idsucursal);
    if (indTienda.length > 0) {
      desTienda = indTienda[0].destab;
    }
    return desTienda;
  }

  private addInvoiceDet(invoiceDet: Invoicedet) {
    this.invoiceId = this.invoiceId + 1;
    this.invoiceDet.push(
      {
        id: this.invoiceId,
        sucursal: invoiceDet.sucursal,
        dessucursal: invoiceDet.dessucursal,
        codpro: invoiceDet.codpro,
        nompro: invoiceDet.nompro,
        cantid: 1,
        punituser: invoiceDet.punituser,
        codcol: invoiceDet.codcol,
        descolor: invoiceDet.descolor,
        talla: invoiceDet.talla,
        serpro: invoiceDet.serpro,
        fecvendet: invoiceDet.fecvendet
      });

    this.searchValue = "";
  }

  crearTicket(): void {
    //console.log("selectedCodcliValue:" + this.selectedCodcliValue)
    //return;

    console.log(" fin creando nuevo ticket");
    this.loading = true;
    if (this.invoiceDet.length > 0 )
    {
    this.invoiceCab["sucursal"] = this.sucursal;
    this.invoiceCab["codcli"] = this.selectedCodcliValue;

    this._loginService.crearTicketPos(this.invoiceDet, this.invoiceCab).subscribe(
      response => {
        console.log(response);
        console.log("cargar link");

        if (response.r1 == 0) {
          this.toastr.success('Nuevo registro añadido exitosamente', 'Venta');
          //var impText = [{'invoicecab':this.invoiceCab, 'invoicecab2':response, 'invoice':this.invoice,}];
          var impText = [{ 'invoicecab': response, 'invoice': this.invoiceDet, }];
          var dataEnconde = btoa(JSON.stringify(impText));
          console.log("convertido");
          console.log(dataEnconde);
          this.jsonImpresion = dataEnconde;
          this.invoiceDet = [];
          this.invoiceCab = this._loginService.getDataDef();
          this.selectedCodcliValue =  this.invoiceCab["codcli"];


          //////////////////////////////////
          //console.log("inicio fire");
          //var obj = JSON.parse(response.nose);
          //console.log("Total Fire:" + Object.keys(obj).length);
          //for (let key in obj) {
          //  this._productService.putProductBarCodeFire(key).set(obj[key]);
          //}
          //console.log("fin fire");
          //////////////////////////////////


          // window.open('http://localhost:8080/ver/impresiones/escpos-php-development/escpos-php-development/example/receipt.php?imp='+ dataEnconde ,'iframeImpresion');  

        } else {
          this.toastr.error(response.r4, 'Venta');
        }

        //finaliza

        //this.invoiceCab = this._loginService.getDataDef();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error("Ha ocurrido un error", 'Venta');
        console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR .");
        
        //console.log(<any>error);
        
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(errorMessage._body);

        }
        
        //this.toastr.error(errorMessage, 'Venta');
      })
    }
    else
    {
      this.loading = false;
      this.toastr.error('Falta agregar productos');
    }
  }



  verclientescombo(): void {

    this._loginService.clientes().subscribe(
      response => {

        this.clienteListCombo = [];
        for (var key in response.datacat) {
          if (response.datacat.hasOwnProperty(key)) {
            var element = response.datacat[key];
            this.clienteListCombo.push({ 'code': element.code, 'name': element.name });
          }
        }


      },
      error => {
        console.log(<any>error);
        //console.log("error 454545.");
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);

        }
      })


  }

  openDialogEditarPrecio(item: number, invoItem: Invoicedet): void {

    console.log("item:" + item);
    console.log("invoItem:" + invoItem.nompro);

    this.tmpInvoiceDet = invoItem;


    let dialogRefDes = this.dialog.open(MyDialogEditarPrecioComponent, {
      width: '450px',
      // data: { name: this.name, animal: this.animal }
      //data: ''
      data: {
        nompro: invoItem.nompro,
        descolor: invoItem.descolor,
        punituser: invoItem.punituser,
        item: item
      }

    });
    //$("#txtpunituser").select();

    dialogRefDes.afterClosed().subscribe(result => {
      if (result != "") {
        //alert(result);

        var tmpLista = this.invoiceDet.filter(obj => obj.codpro == this.tmpInvoiceDet.codpro);
        console.log(tmpLista);
        for (let item of tmpLista) {
          var objIndex = this.invoiceDet.findIndex(obj => obj.id == item.id);
          console.log("objIndex:" + objIndex)
          this.invoiceDet[objIndex].punituser = result.toFixed(2);
        }
      }

      //console.log('The dialog was closed');
      //this.animal = result;
    });

  }

  

}
