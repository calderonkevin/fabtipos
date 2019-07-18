import { Component, OnInit, DoCheck } from '@angular/core';
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
import { CatalogComponent } from '../catalog/catalog.component';

import { MyDialogConsultaClienteComponent } from '../my-dialog-consulta-cliente/my-dialog-consulta-cliente.component';


declare var jQuery: any;
declare var $: any;

export interface Food2 {
  value: string;
  viewValue: string;
}

export interface Cliente {
  codcli: string;
  nomcom: string;
}

export interface PagoMonto {
  codtab: string;
  destab: string;
}


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [LoginService]
})
export class ShopComponent {

  constructor(
    private _loginService: LoginService,
    private _productService: ProductService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private catalogComponent: CatalogComponent,
  ) {

  }

  dataDef = [];

  pagoMontoList: PagoMonto[] = [
    { codtab: 'PTOT', destab: "PAGO TOTAL" },
    { codtab: '0.00', destab: '0.00' },
    { codtab: '1.00', destab: '1.00' },
    { codtab: '2.00', destab: '2.00' },
    { codtab: '5.00', destab: '5.00' },
    { codtab: '10.00', destab: '10.00' },
    { codtab: '20.00', destab: '20.00' },
    { codtab: '50.00', destab: '50.00' },
    { codtab: '100.00', destab: '100.00' },
    { codtab: '200.00', destab: '200.00' },
  ];


  lblVisaText: string = "";

  url3: string = "";
  tiendaList: Tienda[];

  invoiceId: number = 0;
  invoiceCab = [];
  invoiceDet = [];
  tmpInvoiceDet: Invoicedet;
  loading = false;
  loadingprecio = false;
  //jsonImpresion: string;
  clienteListCombo = [];

  productObj: Productbarcode;
  productBarcodeList: Productbarcode[];

  searchValue: string = "";


  sucursal: string = "";
  identity: any;
  //selectedCodcliValue: string;
  tipcodope: string = "0090";
  selectedFormaPagoValue: string = "CONT";
  selectedTipoVentaValue: string = "0090"; // 0011-FACTURA, 0012-BOLETA, 0090-TICKET  


  codautorizacion: string = "";
  pagoefectivo: number = 0.00;
  pagovisa: number = 0.00;
  pagomastercard: number = 0.00;
  pagotextcupon: string = "";
  pagocodcupon: string = "";
  pagocupon: number = 0.00;
  totalCantidad: number = 0.000;
  totalPagar: number = 0.00;
  darvuelto: number = 0.00;
  descuentoGeneral: number = 0.00;
  tienedescuento: string = "NO";



  tiposerpro: number = 0;
  cantiddef: number = 1;
  preciousardef: number = 0;
  clientes: Cliente[];
  ngDoCheck() {
    this.calcularMontos();
  }


  ngOnInit() {

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    this.dataDef = this._loginService.getDataDef();
    this.tipcodope = this.dataDef['tipdocdef'];// "0090";
    this.selectedTipoVentaValue = this.dataDef['tipdocdef'];//"0090"; // 0011-FACTURA, 0012-BOLETA, 0090-TICKET  
    this.selectedFormaPagoValue = this.dataDef['formapagodef'];//"CONT";
    
    if(this.dataDef['tiposerpro'] == 3){
      this.lblVisaText= "Bancos (depo-trans-pos)";
    }
    else{
      this.lblVisaText= "Visa";
    }
    
    this.url3 = this._loginService.url3;
    this.verSucursalcombo();

    /*
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
    */
    this.identity = this._loginService.getIdentity();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit de SHOP ");
    console.log("this.identity: " + this.identity);
    console.log("this.invoiceCab: " + this.invoiceCab);
    console.log(this._loginService.getDataDef());
    this.sucursal = this.invoiceCab['sucursal'];
    this.tiposerpro = this.invoiceCab['tiposerpro'];
    this.preciousardef = this.invoiceCab['preciousardef'];
    //this.selectedCodcliValue = this.invoiceCab['codcli'];


    if (this.sucursal == null) {
      this.sucursal = "";
    }

  }

  invoItemDelete(item: number): void {
    console.log("borrando: " + item);
    this.invoiceDet.splice(item, 1);
  }

  /*
  invoGetTotal(): string {
    var total = 0.00;
    for (let item of this.invoiceDet) {
      total = total + (item.cantid * (item.punituser - (item.descuentouser * 1)))
    }

    //this.totalPagar = total;
    //this.darvuelto =  (this.pagoefectivo + this.pagotarjeta) - total;

    return total.toFixed(2)
  }

  invoGetCantid(): string {
    var total = 0;
    for (let item of this.invoiceDet) {
      total = total + (item.cantid * 1)
    }
    return total.toFixed(0)
  }
  */
  //consultaArticuloBarraAjuIng  

  buscarFire(wsearchValue): void {
    //alert("321");
    //this.searchValue = $("#detectabarra").val();
    this.searchValue = wsearchValue;
    this.crearAtras();
    $("#detectabarra").select();


    console.log("ESTO VIENE DEL TEXTO:" + this.searchValue);
    console.log("ESTO VIENE DE SUCURSAL:" + this.sucursal + "---");

    if (this.tipcodope == "") {
      this.toastr.warning('Falta selecctionar Tipo de Operación');
      return;
    }
    console.log("this.tiposerpro" + this.tiposerpro);
    if (this.tiposerpro == 0 || this.tiposerpro == undefined) {
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
    if (this.tiposerpro == 1) {
      if (this.invoiceDet.filter(obj => obj.serpro == this.searchValue).length > 0) {
        //var lateranIndex = this.invoiceDet.findIndex(this.searchValue);        
        var lateranIndex = this.invoiceDet.indexOf(this.invoiceDet.filter(obj => obj.serpro == this.searchValue)[0]);

        console.log("lateranIndex:" + lateranIndex + this.searchValue);
        
        this.invoiceDet[lateranIndex].cantid = (this.invoiceDet[lateranIndex].cantid * 1) + 1;
        //this.toastr.warning('Existe duplicado del Código de barras.');
        return;
      }
    }
    if (this.tiposerpro == 3) {
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
    $("#detectabarra").prop("disabled", true);
    this._loginService.consultaArticuloBarraAjuIng(this.searchValue).subscribe(
      response => {
        $("#detectabarra").prop("disabled", false);
        $("#detectabarra").select();
        console.log("DENTRO TIENE EL VALOR DE:" + this.searchValue);
        this.productBarcodeList = [];
        var item = response.data;
        console.log("item: " + JSON.stringify(item));
        console.log("item.length: " + item.length);

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


        /////////////
        if (this.tiposerpro == 1) {
          console.log("cantidad se esta ejecutando solo info2: " + this.productBarcodeList.filter(obj => obj.sucursal == this.sucursal && obj.cantid > 0).length);
          //if (this.productBarcodeList.filter(obj => obj.sucursal == this.sucursal && obj.cantid > 0).length === 0) {
            //this.toastr.error('No existe Stock del codigo de barras en el mismo almacen: ' + this.searchValue);
            var indSelect = this.productBarcodeList;
            if (indSelect.length > 0) {
              var wprecio = 0.00;
              if (this.preciousardef == 1)
                wprecio = indSelect[0].precio;
              if (this.preciousardef == 2)
                wprecio = indSelect[0].precio2;


              this.tmpInvoiceDet = {
                id: this.invoiceId,
                sucursal: this.invoiceCab["sucursal"],
                dessucursal: this.getTiendaDestab(this.invoiceCab["sucursal"]),
                codpro: indSelect[0].codpro,
                nompro: indSelect[0].nompro,
                cantid: this.cantiddef,
                descuentouser: 0.00,
                punituser: wprecio,
                codcol: indSelect[0].codcol,
                descolor: indSelect[0].descolor,
                talla: indSelect[0].talla,
                serpro: indSelect[0].serpro,
                fecvendet: indSelect[0].fecvendet,
                imagen: indSelect[0].imagen,
                importe: 0
              };
            //}
            this.addInvoiceDet(this.tmpInvoiceDet);
            //this.toastr.info('SE AGREGA DEL MISMO ALMACEN: ' + this.searchValue);          
            //return;
          }
          return; // se pone porque como tiposerpro es igual a 1 entonces ya no debe continuar el proceso
        }
        //////////////////
        console.log("cantidad se esta ejecutando solo info3: " + this.productBarcodeList.filter(obj => obj.cantid > 0).length);
        if (this.productBarcodeList.filter(obj => obj.cantid > 0).length === 0) {
          this.toastr.error('No existe Stock del codigo de barras: ' + this.searchValue);
          return;
        }

        var indSelect = this.productBarcodeList.filter(obj => obj.sucursal == this.sucursal && obj.cantid > 0)
        if (indSelect.length === 1) {

          var wprecio = 0.00;
          if (this.preciousardef == 1)
            wprecio = indSelect[0].precio;
          if (this.preciousardef == 2)
            wprecio = indSelect[0].precio2;

          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal: this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: this.cantiddef,
            descuentouser: 0.00,
            punituser: wprecio,
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

          var wprecio = 0.00;
          if (this.preciousardef == 1)
            wprecio = indSelect[0].precio;
          if (this.preciousardef == 2)
            wprecio = indSelect[0].precio2;


          this.tmpInvoiceDet = {
            id: this.invoiceId,
            sucursal: indSelect[0].sucursal,
            dessucursal: this.getTiendaDestab(indSelect[0].sucursal),
            codpro: indSelect[0].codpro,
            nompro: indSelect[0].nompro,
            cantid: this.cantiddef,
            descuentouser: 0.00,
            punituser: wprecio,
            codcol: indSelect[0].codcol,
            descolor: indSelect[0].descolor,
            talla: indSelect[0].talla,
            serpro: indSelect[0].serpro,
            fecvendet: indSelect[0].fecvendet,
            imagen: indSelect[0].imagen,
            importe: 0
          };

          this.addInvoiceDet(this.tmpInvoiceDet);

          this.toastr.info('Se trae de otra Tienda: ' + this.getTiendaDestab(indSelect[0].sucursal));
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
        descuentouser: 0.00,
        punituser: invoiceDet.punituser,
        codcol: invoiceDet.codcol,
        descolor: invoiceDet.descolor,
        talla: invoiceDet.talla,
        serpro: invoiceDet.serpro,
        fecvendet: invoiceDet.fecvendet,
        imagen: invoiceDet.imagen,
        observ: invoiceDet.observ
      });

    this.searchValue = "";
  }

  crearTicket(): void {
    console.log("selectedFormaPagoValue:" + this.selectedFormaPagoValue)
    console.log("selectedTipoVentaValue:" + this.selectedTipoVentaValue)
    console.log("Monto darvuelto:" + this.darvuelto)
    console.log("Monto pagoefectivo:" + this.pagoefectivo)
    console.log("Monto pagovisa:" + this.pagovisa)
    console.log("Monto pagomastercard:" + this.pagomastercard)
    console.log("Codigo pagocodcupon:" + this.pagocodcupon)
    console.log("Monto pagocupon:" + this.pagocupon)

    

    console.log("Inicio creando nuevo ticket");


    this.loading = true;
    this.tipcodope = this.selectedTipoVentaValue;


    this.invoiceCab["sucursal"] = this.sucursal;
    this.invoiceCab['tipcodope'] = this.tipcodope;
    this.invoiceCab['formapago'] = this.selectedFormaPagoValue;
    this.invoiceCab['descuentogeneral'] = this.descuentoGeneral;    
    
    //this.invoiceCab["codcli"] = this.selectedCodcliValue;

    console.log(this.invoiceCab);
    console.log(this.invoiceDet);


    if (this.invoiceCab['codcli'] == "") {
      this.toastr.error('Falta seleccionar Cliente');
      this.loading = false;
      return

    }

    /////////// inicio validar factura
    if (this.invoiceCab['tipcodope'] == "0011") {
      if (this.invoiceCab['codcli'] == "00") {
        this.toastr.error('No se puede realizar Factura con cliente ' + this.invoiceCab['nomcom']);
        this.loading = false;
        return
      }
      if (this.invoiceCab['inden'] != "000001") {
        this.toastr.error('No se puede realizar Factura con ' + this.invoiceCab['desinden']);
        this.loading = false;
        return
      }
      //this.toastr.success('Validacion Factura OK');
    }
    /////////// fin validar factura

    /////////// inicio validar boleta
    if (this.invoiceCab['tipcodope'] == "0012") {
      if (this.invoiceCab['inden'] != "000005") {
        this.toastr.error('No se puede realizar Boleta con ' + this.invoiceCab['desinden']);
        this.loading = false;
        return
      }
      if (this.totalPagar > 700 && this.invoiceCab['codcli'] == "00") {
        this.toastr.error('No se puede realizar Boleta con cliente ' + this.invoiceCab['nomcom'] + ", porque el monto es mayor a 700.00.");
        this.loading = false;
        return

      }

      //this.toastr.success('Validacion BOLETA OK');
    }
    /////////// fin validar boleta
    console.log("this.invoiceDet.length" + this.invoiceDet.length);
    if (this.invoiceDet.length == 0) {
      this.loading = false;
      this.toastr.error('Falta agregar productos');
      return
    }

    /////////// inicio validar contado

    if (this.invoiceCab['formapago'] == "CONT") {

      if (this.pagovisa > this.totalPagar) {
        this.toastr.error('Error monto con ' + this.lblVisaText + ', no puede ser mayor al Total a Pagar.');
        this.loading = false;
        return
      }

      if (this.pagomastercard > this.totalPagar) {
        this.toastr.error('Error monto con MASTERCARD, no puede ser mayor al Total a Pagar.');
        this.loading = false;
        return
      }

      if (this.pagocupon > this.totalPagar) {
        this.toastr.error('Error monto con VALE, no puede ser mayor al Total a Pagar.');
        this.loading = false;
        return
      }

      if ((this.pagovisa + this.pagomastercard + this.pagocupon) > this.totalPagar) {
        this.toastr.error('Error monto con TARJETAS O VALES, no puede ser mayor al Total a Pagar.');
        this.loading = false;
        return
      }

      if ((this.pagovisa + this.pagomastercard + this.pagocupon) == this.totalPagar && this.pagoefectivo > 0) {
        this.toastr.error('Error, si esta pagando con tarjeta monto de soles debe ser 0.');
        this.loading = false;
        return
      }

      if ((this.pagoefectivo + this.pagovisa + this.pagomastercard + this.pagocupon) < this.totalPagar) {
        this.toastr.error('Error,el monto ingresado es menor al Total a Pagar.');
        this.loading = false;
        return
      }

      //this.loading = false;
      //this.toastr.success('Validacion CONTADO OK');
      //return;
    }
    /// pago al credito
    //if (this.invoiceCab['formapago'] == "CRED") {
      //this.pagoefectivo = 0.00;
      //this.pagovisa = 0.00;
      //this.pagomastercard = 0.00;
      //this.pagocodcupon = "";
      //this.pagocupon = 0.00;
    //}

    this.invoiceCab['pagoefectivo'] = this.pagoefectivo;
    this.invoiceCab['pagovisa'] = this.pagovisa;
    this.invoiceCab['pagomastercard'] = this.pagomastercard;
    this.invoiceCab['pagocodcupon'] = this.pagocodcupon;
    this.invoiceCab['pagocupon'] = this.pagocupon;
    this.invoiceCab['tienedescuento'] = this.tienedescuento;
    this.invoiceCab['codautorizacion'] = this.codautorizacion;
    this.invoiceCab['darvuelto'] = this.darvuelto;
    
    ///////////////
    //this.toastr.success('Validacion CONTADO OK');    
    console.log("ESTA ES");
    console.log(this.invoiceDet);
    //this.loading = false;
    //return;


    this._loginService.crearTicketPos(this.invoiceDet, this.invoiceCab).subscribe(
      response => {
        console.log(response);
        console.log("cargar link");

        if (response.r1 == 0) {
          //if(this.invoiceCab['tipcodope'] == '0011' || this.invoiceCab['tipcodope'] == '0012'){
          //  var wDocEle = response.dataCab.docele;            

          //  if(wDocEle.codigo != '0'){
          //    this.toastr.warning('Sunat, ' + wDocEle.errors  , 'Venta');    
          //  }
          //  else{
          //    this.toastr.success('Nuevo registro añadido exitosamente', 'Venta');
          //  }
          //}else{
          //  this.toastr.success('Nuevo registro añadido exitosamente', 'Venta');
          //}
          this.toastr.success('Nuevo registro añadido exitosamente', 'Venta');
          
          //var impText = [{'invoicecab':this.invoiceCab, 'invoicecab2':response, 'invoice':this.invoice,}];
          var impText = [{ 'invoicecab': response.dataCab, 'invoice': response.dataDet }];
          //var dataEnconde = btoa(JSON.stringify(impText));
          console.log("convertido");
          //console.log(dataEnconde);
          //this.jsonImpresion = dataEnconde;
          this.invoiceDet = [];
          this.invoiceCab = this._loginService.getDataDef();
          //this.selectedCodcliValue = this.invoiceCab["codcli"];
          //this.catalogComponent.loadTicketDet('');
          this.catalogComponent.loadTicket('');
          //this.tipcodope = "0090";
          //this.selectedFormaPagoValue = "CONT";
          //this.selectedTipoVentaValue = "0090"; // 0011-FACTURA, 0012-BOLETA, 0090-TICKET

          this.tipcodope = this.dataDef['tipdocdef'];// "0090";
          this.selectedTipoVentaValue = this.dataDef['tipdocdef'];//"0090"; // 0011-FACTURA, 0012-BOLETA, 0090-TICKET  
          this.selectedFormaPagoValue = this.dataDef['formapagodef'];//"CONT";    

          this.pagoefectivo = 0.00;
          this.pagovisa = 0.00;
          this.pagomastercard = 0.00;
          this.descuentoGeneral = 0.00;
          this.pagocodcupon = "";
          this.pagotextcupon = "";
          this.pagocupon = 0.00;



          $("#divProductos").show();
          $("#divPagos").hide();


          //////////////////////////////////
          //console.log("inicio fire");
          //var obj = JSON.parse(response.nose);
          //console.log("Total Fire:" + Object.keys(obj).length);
          //for (let key in obj) {
          //  this._productService.putProductBarCodeFire(key).set(obj[key]);
          //}
          //console.log("fin fire");
          //////////////////////////////////
          console.log("L L A M A   I M P R E S I O N ");
          console.log("L L A M A   I M P R E S I O N ");
          console.log("L L A M A   I M P R E S I O N ");
          //window.open(this.invoiceCab["rutaimp"]+ 'docTicket.php?imp=' + dataEnconde, 'iframeImpresion');
          if(response.dataCab.tipcodope == "0011" || response.dataCab.tipcodope == "0012")
          {
              //window.open(this.dataDef["rutaimp"] + 'docDocu.php?imp=' + dataEnconde, 'iframeImpresion');              
              $.post( this.dataDef["rutaimp"] + 'docDocu.php', { imp: impText } );
          }
          else
          {
            //window.open(this.dataDef["rutaimp"] + 'docTicket.php?imp=' + dataEnconde, 'iframeImpresion');            
            if(this.dataDef["tiposerpro"] == 1){
                $.post( this.dataDef["rutaimp"] + 'docDocu.php', { imp: impText } );  
            }else{
                $.post( this.dataDef["rutaimp"] + 'docTicket.php', { imp: impText } );
            }
          }          
          console.log("FIN L L A M A   I M P R E S I O N ");


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



  verclientescombo(): void {

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

  }

  verSucursalcombo(): void {

    this._loginService.sucursalCombo().subscribe(
      response => {
        console.log("L I S T A   D E   SUCURSAL COMBO");
        console.log(response);
        this.tiendaList = response.data;
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
          var wp = (result.punituser * 1);
          var wpd = (result.descuentouser * 1);
          var wobserv = result.observ;
          this.invoiceDet[objIndex].cantid = wc.toFixed(0);
          this.invoiceDet[objIndex].punituser = wp.toFixed(2);
          this.invoiceDet[objIndex].observ = wobserv;
        }
      }

      //console.log('The dialog was closed');
      //this.animal = result;
    });

  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>        
        <style>

        
        .fontGen {
          font-family: sans-serif;
          font-size: 12px;
          font-style: normal;
          font-variant: normal; 
          font-weight: 150;
      }

      .tTitle {                
          font-size: 13px;
          font-weight: bold;                
          text-align: center;
      }

      .tNumTicket {                
          font-weight: bold;
          text-align: center;
      }
      .tLinea {
        text-align: center;
      }

      .tTabla {
        font-size: 9px;
        width:100%;        
    }
    .tCambioDoc {
      font-size: 11px;
      text-align: center;
  }
  .tCantidad {  
    text-align: right;
  }

  .tPrecio { 
    text-align: right;
}


  

  table td, table td * {
    vertical-align: top;
}
    
        </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  openDialogConsultaCliente(): void {

    let dialogRefDes = this.dialog.open(MyDialogConsultaClienteComponent, {
      width: '600px',
      // data: { name: this.name, animal: this.animal }
      //data: ''      
    });

    dialogRefDes.afterClosed().subscribe(result => {
      //alert(result);
      if (result != "" && result != undefined) {
        //alert("aaaa");
        console.log(result);
        //console.log(this.invoiceCab);
        this.invoiceCab['inden'] = result.inden;
        this.invoiceCab['desinden'] = result.desinden;
        this.invoiceCab['codcli'] = result.codcli;
        this.invoiceCab['nomcom'] = result.nomcom;
        this.invoiceCab['dircli'] = result.dircli;

      }
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  calcularMontos() {

    var wtotCantid = 0.000;
    var wTotMonto = 0.00;
    this.tienedescuento = "NO";

    for (let item of this.invoiceDet) {
      wtotCantid = wtotCantid + (item.cantid * 1);
      wTotMonto = wTotMonto + (item.cantid * (item.punituser - (item.descuentouser * 1)));
      if((item.descuentouser*1) != 0)
        this.tienedescuento = "SI";
    }

    this.totalCantidad = wtotCantid;
    this.totalPagar = wTotMonto - this.descuentoGeneral;
    this.darvuelto = ((this.pagoefectivo*1) + (this.pagovisa*1) + (this.pagomastercard*1) + (this.pagocupon*1)) - this.totalPagar;    

    

    if((this.descuentoGeneral * 1) != 0)
      this.tienedescuento = "SI";
    
    

  }

  crearSiguiente() {
    $("#divProductos").hide();
    $("#divPagos").show();    
    //this.pagoefectivo = this.totalPagar;
    if(this.dataDef['tiposerpro'] == 1)
    {
      this.pagoefectivo = this.totalPagar;
    }else{
      this.pagoefectivo = 0.00;
    }   
    
    this.pagovisa = 0.00;
    this.pagomastercard = 0.00;
    this.pagomastercard = 0.00;
    this.pagocodcupon = "";
    this.pagotextcupon = "";
    this.pagocupon = 0.00;
    this.codautorizacion = "";
  }

  crearAtras() {
    $("#divProductos").show();
    $("#divPagos").hide();

  }

  pago01() {
    this.pagoefectivo = this.totalPagar;
    this.pagovisa = 0.00;
    this.pagomastercard = 0.00;
    this.pagotextcupon = "";
    this.pagocodcupon = "";
    this.pagocupon = 0.00;
    

  }

  pago02() {
    this.pagoefectivo = 0.00;
    this.pagovisa = this.totalPagar;
    this.pagomastercard = 0.00;
    this.pagotextcupon = "";
    this.pagocodcupon = "";
    this.pagocupon = 0.00;
  }

  pago03() {
    this.pagoefectivo = 0.00;
    this.pagovisa = 0.00;
    this.pagomastercard = this.totalPagar;
    this.pagotextcupon = "";
    this.pagocodcupon = "";
    this.pagocupon = 0.00;
  }

  buscarCodeVale() {    
    if(this.pagotextcupon.trim() == "")
    {
      this.pagocodcupon = "";
      this.pagocupon = 0.00;
      this.toastr.warning("Código borrado");
      return;
    }


    this._loginService.getCodeVale(this.pagotextcupon).subscribe(
      response => {
        
        if(response.r1 == 0)
        {
          this.pagocodcupon = response.codtab;
          this.pagocupon = response.importe;
          this.toastr.info('Código Correcto');
        }else
        {
          this.pagocodcupon = "";
          this.pagocupon = 0.00;
          this.toastr.error(response.r4);
          return;
        }

      });
  }

  btnFormaPago(){

    if (this.selectedFormaPagoValue == 'CRED')
    {      
      this.invoiceCab['codcli'] = "";
      this.invoiceCab['nomcom'] = "";
      this.openDialogConsultaCliente();
    }

    
  }
  

}
