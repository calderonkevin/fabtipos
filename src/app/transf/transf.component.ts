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
import { MyDialogEditarCantidComponent } from '../my-dialog-editar-cantid/my-dialog-editar-cantid.component';
import { CatalogComponent } from '../catalog/catalog.component';

declare var jQuery: any;
declare var $: any;

export interface Personal {
  codcli: string;
  nomcom: string;
}

@Component({
  selector: 'app-transf',
  templateUrl: './transf.component.html',
  styleUrls: ['./transf.component.css'],
  providers: [LoginService]
})
export class TransfComponent {  

  tiendaList: Tienda[];
  personalListCombo: Personal[];

  constructor(
    private _loginService: LoginService,
    private _productService: ProductService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private catalogComponent: CatalogComponent,
  ) {

  }

  dataDef = [];
  url3: string = "";
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

  tipcodope: string = "0013";
  sucursal: string = "";
  identity: any;
  selectedSucrefValue: string;

  ngOnInit() {

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    this.verSucursalcombo();
    this.url3 = this._loginService.url3;
    
    this.identity = this._loginService.getIdentity();
    this.dataDef = this._loginService.getDataDef();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit de TRANSFERENCIA ");
    console.log("this.identity: " + this.identity);
    console.log("this.invoiceCab: " + this.invoiceCab);
    console.log(this._loginService.getDataDef());
    this.sucursal = this.invoiceCab['sucursal'];
        
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

  invoGetCantid(): string {
    var total = 0;
    for (let item of this.invoiceDet) {
      total = total + (item.cantid * 1)
    }    
    return total.toFixed(0)
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
          this.toastr.info("BIEN", 'Transferencia');
        
        } else {
          this.toastr.error(response.r4, 'Transferencia');
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
        //this.toastr.error(errorMessage, 'Transferencia');
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

    console.log("this.tiposerpro" + this.dataDef['tiposerpro']);
    if (this.dataDef['tiposerpro'] == 0 || this.dataDef['tiposerpro'] == undefined) {
      this.toastr.warning('Falta definir tipo de validacion de codigos de barras');
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

    if (this.dataDef['tiposerpro'] == 1 || this.dataDef['tiposerpro'] == 4) {
      if (this.invoiceDet.filter(obj => obj.serpro == this.searchValue).length > 0) {
        //var lateranIndex = this.invoiceDet.findIndex(this.searchValue);        
        var lateranIndex = this.invoiceDet.indexOf(this.invoiceDet.filter(obj => obj.serpro == this.searchValue)[0]);
        console.log("lateranIndex:" + lateranIndex + this.searchValue);        
        this.invoiceDet[lateranIndex].cantid = (this.invoiceDet[lateranIndex].cantid * 1) + 1;
        //this.toastr.warning('Existe duplicado del Código de barras.');
        return;
      }
    }

    if (this.dataDef['tiposerpro'] == 3) {
      if (this.invoiceDet.filter(obj => obj.serpro == this.searchValue).length > 0) {
        this.toastr.warning('Existe duplicado del Código de barras.');
        return;
      }
    }

    console.log("INGRESA:" + this.searchValue);
    //let subscription = this._productService.getProductBarCode(this.searchValue)
    //  .snapshotChanges()
    //  .subscribe(item => {
    //    subscription.unsubscribe();
    $("#detectabarra").prop( "disabled", true );
    this._loginService.consultaArticuloBarraAjuIng(this.searchValue).subscribe(
      response => {
        $("#detectabarra").prop( "disabled", false );
        $("#detectabarra").select();
        console.log("DENTRO TIENE EL VALOR DE:" + this.searchValue);
        this.productBarcodeList = [];
        var item = response.data;
        console.log("item: "+ JSON.stringify(item));
        console.log("item.length" + item.length);  
        
        if (item.length === 0) {
          this.toastr.error('No existe codigo de barras: ' + this.searchValue);
          return;
        }

        item.forEach(element => {
          var x = element;
          //console.log(element.key);
          x["$key"] = element.serpro;
          //console.log(element.key);
          this.productBarcodeList.push(x as Productbarcode);          
          console.log("lista de this.productBarcodeList:" + JSON.stringify(this.productBarcodeList));

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
            descuentouser:0.00,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet,
            imagen: indSelect[0].imagen,
            importe: 0
          };

          this.addInvoiceDet(this.tmpInvoiceDet);
          //this.toastr.info('SE AGREGA DEL MISMO ALMACEN: ' + this.searchValue);
          return;
        }
        else{
          this.toastr.error('No existe producto en Tienda Origen: ' + this.searchValue);
          return;
        }

        var indSelect = this.productBarcodeList.filter(obj => obj.sucursal != this.sucursal && obj.cantid > 0)
        if (indSelect.length > 0) {

          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal : this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: 1,
            descuentouser:0.00,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet,
            imagen: indSelect[0].imagen,
            importe: 0
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
            descuentouser:0.00,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet,
            imagen: indSelect[0].imagen,
            importe: 0
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
            descuentouser:0.00,
            punituser: indSelect[0].precio2,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet,
            imagen: indSelect[0].imagen,
            importe: 0
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
    //var indTienda = this.tiendaList.filter(obj => obj.$key.padStart(6, '0') == idsucursal);
    var indTienda = this.tiendaList.filter(obj => obj.codtab == idsucursal);
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
        cantid: invoiceDet.cantid,
        punituser: invoiceDet.punituser,
        codcol: invoiceDet.codcol,
        descolor: invoiceDet.descolor,
        talla: invoiceDet.talla,
        serpro: invoiceDet.serpro,
        fecvendet: invoiceDet.fecvendet,
        imagen: invoiceDet.imagen
      });

    this.searchValue = "";
  }

  crearTransferencia(): void {
    //console.log("selectedSucrefValue:" + this.selectedSucrefValue)
    //return;

    console.log(" fin creando nuevo Transferencia");
    this.loading = true;
    console.log("this.selectedSucrefValue: " + this.selectedSucrefValue)
    if(this.selectedSucrefValue == "" || this.selectedSucrefValue == undefined)
    {
      this.loading = false;
      this.toastr.error("Falta Seleccionar Tienda Destino");
      return;
    }

    if(this.sucursal == this.selectedSucrefValue)
    {
      this.loading = false;
      this.toastr.error("No se puede realizar transferencia a la misma Tienda");
      return;
    }

    if (this.invoiceDet.length == 0 )
    {      
      this.loading = false;
      this.toastr.error('Falta agregar productos');
      return;
    }

    this.invoiceCab["sucursal"] = this.sucursal;
    this.invoiceCab["sucref"] = this.selectedSucrefValue;

    

    //this.invoiceCab["sucref"] = "000003";

    this._loginService.crearTransferenciaPos(this.invoiceDet, this.invoiceCab).subscribe(
      response => {
        console.log(response);
        console.log("cargar link");

        if (response.r1 == 0) {
          this.toastr.success('Nuevo registro añadido exitosamente', 'Transferencia');
          //var impText = [{'invoicecab':this.invoiceCab, 'invoicecab2':response, 'invoice':this.invoice,}];
          var impText = [{ 'invoicecab': response, 'invoice': this.invoiceDet, }];
          var dataEnconde = btoa(JSON.stringify(impText));
          console.log("convertido");
          console.log(dataEnconde);
          this.jsonImpresion = dataEnconde;
          this.invoiceDet = [];
          this.invoiceCab = this._loginService.getDataDef();
          //this.selectedSucrefValue =  "";
          this.catalogComponent.loadTransferenciaDet('');


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
          this.toastr.error(response.r4, 'Transferencia');
        }

        //finaliza

        //this.invoiceCab = this._loginService.getDataDef();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error("Ha ocurrido un error", 'Transferencia');
        console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR .");
        
        //console.log(<any>error);
        
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(errorMessage._body);

        }
        
        //this.toastr.error(errorMessage, 'Transferencia');
      })
    
  }

  openDialogEditarCantid(item: number, invoItem: Invoicedet): void {

    console.log("item:" + item);
    console.log("invoItem:" + invoItem.nompro);

    this.tmpInvoiceDet = invoItem;


    let dialogRefDes = this.dialog.open(MyDialogEditarCantidComponent, {
      width: '450px',
      // data: { name: this.name, animal: this.animal }
      //data: ''
      data: {        
        nompro: invoItem.nompro,
        descolor: invoItem.descolor,
        cantid: invoItem.cantid,
        punituser: invoItem.punituser,
        descuentouser: invoItem.descuentouser,
        observ: invoItem.observ,
        item: item
      }

    });
    //$("#txtpunituser").select();

    dialogRefDes.afterClosed().subscribe(result => {
      if (result != "") {
        //alert(result);
        console.log(result);
        console.log("AAAAAAAAA" + result.punituser);

        var tmpLista = this.invoiceDet.filter(obj => obj.codpro == this.tmpInvoiceDet.codpro);
        console.log(tmpLista);
        for (let item of tmpLista) {
          var objIndex = this.invoiceDet.findIndex(obj => obj.id == item.id);
          console.log("objIndex:" + objIndex)
          var wc = (result.cantid * 1);
          //var wp = (result.punituser * 1);
          //var wpd = (result.descuentouser * 1);
          //var wobserv = result.observ;
          this.invoiceDet[objIndex].cantid = wc.toFixed(0);
          //this.invoiceDet[objIndex].punituser = wp.toFixed(2);
          //this.invoiceDet[objIndex].observ = wobserv;
        }
      }

      //console.log('The dialog was closed');
      //this.animal = result;
    });

  }



  verSucursalcombo(): void {

    this._loginService.sucursalCombo().subscribe(
      response => {
        console.log("L I S T A   D E   SUCURSAL222 COMBO");
        console.log(response);        
        this.tiendaList = response.data;  
        console.log(this.tiendaList);
        console.log("L I S T A   D E   SUCURSAL222 FIN COMBO");
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
  }

  verPersonalCombo(): void {

    this._loginService.personalCombo().subscribe(
      response => {
        console.log("L I S T A   D E   PERSONAL COMBO");
        console.log(response);        
        this.tiendaList = response.data;  
        console.log(this.tiendaList);
        console.log("L I S T A   D E   PERSONAL FIN COMBO");
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
  }


}