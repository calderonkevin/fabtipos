import { Component, OnInit , Input} from '@angular/core';
import { MatDialog } from '@angular/material';

//model
import { Productbarcode } from '../models/productbarcode';
import { Invoicedet } from '../models/invoicedet';
import { Tienda } from '../models/tienda';
import { Motivo } from '../models/motivo';
import { ListaPair } from '../models/listapair';

//service
import { LoginService } from '../common/services/login.service';
import { ProductService } from '../common/services/product.service';

//toastr
import { ToastrService } from 'ngx-toastr';

//Dialog
import { MyDialogEditarPrecioComponent } from '../my-dialog/my-dialog-editar-precio.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { MyDialogDevolucionComponent } from '../my-dialog-devolucion/my-dialog-devolucion.component';



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


@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css'],
  providers: [LoginService]
})
export class DevolucionComponent {  

  @Input() itemDevolucion: any;
  
  clientes: Cliente[];  
  
  tiendaList: Tienda[];
  motivoList: Motivo[];
  devTipoList: ListaPair[];

  constructor(
    private _loginService: LoginService,
    private _productService: ProductService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private catalogComponent: CatalogComponent,
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

  tipcodope: string = "0007";
  sucursal: string = "";
  identity: any;
  selectedCodcliValue: string;
  selectedMotivoValue: string;
  selectedDevTipoValue: string;

  ngOnInit() {    

    this.verMotivocombo();
    this.verDevTipocombo();

    this.identity = this._loginService.getIdentity();
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.invoiceCab = this._loginService.getDataDef();
    this.invoiceCab["codcli"]="";
    this.invoiceCab['nomcom']="";
    console.log("entra a oninit de DEVOLUCION ");
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
    $("#detectabarra").prop( "disabled", true );
    
    var dataDev = [{'sucursalref': this.invoiceCab['sucursal']
                    ,'tipcodoperef': this.invoiceCab['tipcodope']
                    ,'numcodoperef': this.invoiceCab['numcodope']
                    ,'busqueda': this.searchValue
                  }];        

    this._loginService.listaValidaBarraJson(dataDev).subscribe(
      response => {
        $("#detectabarra").prop( "disabled", false );
        $("#detectabarra").select();
        if (response.r1 == 0) {
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
            console.log("lista de this.productBarcodeList:" + JSON.stringify(this.productBarcodeList));

          });
          console.log("cantidad se esta ejecutando solo: " + this.productBarcodeList.filter(obj => obj.cantid > 0).length);
          if (this.productBarcodeList.filter(obj => obj.cantid > 0).length === 0) {
            this.toastr.error('No existe codigo de barras: ' + this.searchValue);
            return;
          }

          var indSelect = this.productBarcodeList.filter(obj => obj.sucursal == this.sucursal && obj.cantid > 0)
          console.log("indSelect.length: " + indSelect.length)
          if (indSelect.length === 1) {
              console.log("response.pagobarra.importe: " + response.pagobarra[0].importe);
              console.log(response.pagobarra[0].saldo);
              var wacuenta = 0.00;
              if(response.pagobarra[0].formapago == 'CONT')
              {
                wacuenta = response.pagobarra[0].importe;
              }
              else if(response.pagobarra[0].formapago == 'CRED')
              {
                wacuenta = (response.pagobarra[0].importe - response.pagobarra[0].saldo);
              }else
              {
                this.toastr.error('Existe un error de pagos: ' + this.searchValue);
                return;
              }
              
              console.log(wacuenta);
              
            this.tmpInvoiceDet = {
              id: this.invoiceId,
              sucursal: indSelect[0].sucursal,
              dessucursal : "", //this.getTiendaDestab(indSelect[0].sucursal),
              codpro: indSelect[0].codpro,
              nompro: indSelect[0].nompro,
              cantid: indSelect[0].cantid,
              descuentouser:0.00,
              punituser: wacuenta / indSelect[0].cantid,
              codcol: indSelect[0].codcol,
              descolor: indSelect[0].descolor,
              talla: indSelect[0].talla,
              serpro: indSelect[0].serpro,
              fecvendet: indSelect[0].fecvendet,
              imagen: indSelect[0].imagen,
              importe: response.pagobarra[0].importe,
              saldo: response.pagobarra[0].saldo,
              acuenta: indSelect[0].punituser
          
            };

            this.addInvoiceDet(this.tmpInvoiceDet);
            //this.toastr.info('SE AGREGA DEL MISMO ALMACEN: ' + this.searchValue);
            return;
          }
          //else{
          //  this.toastr.error('No exsiste producto en el almacen seleccionado: ' + this.searchValue);
          //  return;
          //}          

          this.toastr.error('P A S A N D O    E S T O    E S T A   M A L');

        } else {
          this.toastr.error(response.r4, 'Devolución');
        }

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
        importe:  invoiceDet.importe,
        saldo:  invoiceDet.saldo,
        acuenta:  invoiceDet.acuenta

      });

    this.searchValue = "";
  }

  crearDevolucion(): void {
    //console.log("selectedCodcliValue:" + this.selectedCodcliValue)
    //return;

    console.log(" fin creando nuevo Devolución");

    this.invoiceCab["sucursal"] = this.sucursal;    
    /*
    this.invoiceCab['tipcodope']=item["tipcodope"];
    this.invoiceCab['numcodope']=item["numcodope"];
    this.invoiceCab["codcli"]=item["codcli"];
    this.invoiceCab['nomcom']=item["nomcom"];    
    this.invoiceCab['destipodoc']=item["destipodoc"];
    this.invoiceCab['serienumref']=item["serienumref"];
    this.invoiceCab['numref']=item["numref"];
    this.invoiceCab['numcodope']=item["numcodope"];
    */
    this.loading = true;

    if(this.selectedMotivoValue == "" || this.selectedMotivoValue == undefined)
    {
      this.loading = false;
      this.toastr.error("Falta Seleccionar Motivo Devolución");
      return;
    }

    if(this.selectedDevTipoValue == "" || this.selectedDevTipoValue == undefined)
    {
      this.loading = false;
      this.toastr.error("Falta Seleccionar Tipo Devolución");
      return;
    }

    if (this.invoiceDet.length == 0 )
    {    
      this.loading = false;
      this.toastr.error('Falta agregar productos');
      return;
    }

    this.invoiceCab["motivo"] = this.selectedMotivoValue;
    this.invoiceCab["tipocobranza"] = this.selectedDevTipoValue;

    this._loginService.crearDevolucionPos(this.invoiceDet, this.invoiceCab).subscribe(
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
          this.selectedMotivoValue = "";          
          this.selectedDevTipoValue = "";
          this.invoiceCab = this._loginService.getDataDef();   
          this.invoiceCab["codcli"]="";
          this.invoiceCab['nomcom']="";

          this.catalogComponent.loadDevolucion();

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


  obtenerDatosDevolucion(item:any){    
    this.invoiceCab['tipcodope']=item["tipcodope"];
    this.invoiceCab['numcodope']=item["numcodope"];
    this.invoiceCab["codcli"]=item["codcli"];
    this.invoiceCab['nomcom']=item["nomcom"];    
    this.invoiceCab['destipodoc']=item["destipodoc"];
    this.invoiceCab['serienumref']=item["serienumref"];
    this.invoiceCab['numref']=item["numref"];    

    this.invoiceCab['tipcodoperef']=item["tipcodope"];
    this.invoiceCab['numcodoperef']=item["numcodope"];
    this.invoiceCab["codcliref"]=item["codcli"];
    
  }  

  

  openDialogDevolucion(): void {

    let dialogRefDes = this.dialog.open(MyDialogDevolucionComponent, {
      width: '900px',
      // data: { name: this.name, animal: this.animal }
      //data: ''      
    });

    dialogRefDes.afterClosed().subscribe(result => {
      //alert(result);
      if (result != "") {        
        this.invoiceDet = [];
        this.invoiceCab = this._loginService.getDataDef();
        this.obtenerDatosDevolucion(result);        
        console.log(result);
      }      
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  verMotivocombo(): void {

    this._loginService.motivoCombo().subscribe(
      response => {
        console.log("L I S T A   D E   MOTIVO COMBO");
        console.log(response);
        this.motivoList = response.data;  
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

  verDevTipocombo(): void {

    this._loginService.destipoCombo().subscribe(
      response => {
        console.log("L I S T A   D E   DEVTIPO COMBO");
        console.log(response);        
        this.devTipoList = response.data;  
        console.log(this.devTipoList);
        console.log("L I S T A   D E   DEVTIPO FIN COMBO");
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
