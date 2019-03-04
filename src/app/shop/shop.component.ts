import { Component } from '@angular/core';

//model
import { Productbarcode } from '../models/productbarcode';

//service
import { ProductService } from '../common/services/product.service';

//toastr
import { ToastrService } from 'ngx-toastr';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) {

  }

  invoiceId: number = 0;
  invoiceCab = [];

  productObj: Productbarcode;
  searchValue: string = "";

  tipcodope: string = "0090";
  sucursal: string = "000001";



  //invoice = [];
  invoice: Productbarcode[] = [
    {
      id: 1,
      sucursal : '000001',
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
      sucursal : '000001',
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
      sucursal : '000001',
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
      sucursal : '000001',
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
  


  invoItemDelete(item: number): void {
    this.invoice.splice(item, 1);
  }

  invoGetTotal(): string {
    var total = 0;
    for (let item of this.invoice) {
      total = total + (item.cantid * item.punituser)
    }
    return total.toFixed(2)
  }

  buscarFire(searchValue: string): void {
    this.searchValue = $("#detectabarra").val();
    //console.log("ESTO VIENE DEL TEXTO:" + this.searchValue);

    //this.toastr.info("ESTO VIENE DEL TEXTO:" + this.searchValue + " - tipcodope:" + this.tipcodope + " - sucursal:" + this.sucursal);

    if (this.tipcodope != "" && this.sucursal != "" && this.searchValue != "") {

      //Inicio - buscar producto duplicado
      var duplicadoExiste = "";
      var tmpLista = this.invoice.filter(obj => obj.serpro == this.searchValue);
      console.log(tmpLista);
      for (let item of tmpLista) {
        duplicadoExiste = "SI";
      }
      //Fin - buscar producto duplicado
      if (duplicadoExiste === "SI") {
        this.toastr.warning('Existe duplicado del Código de barras.');
      } else {


        var aRef = this._productService.getIdProducto("aaa").list("listabarra/" + this.searchValue)
          .snapshotChanges()
          .subscribe(item => {
            //this.productObj = null;
            console.log("Item: " + item);
            //console.log("SubItem: "+item.payload);

            //console.log("Item: "+item.payload.;
            //console.log(item.length);
            //console.log("aaaa: "+item.forEach.);
            var arr = [];
            arr['serpro'] = this.searchValue;
            //arr['sucursal'] = this.sucursal;
            item.forEach(element => {
              let x = element.payload.toJSON();
              console.log("key:" + element.key);
              console.log("value:" + x);
              arr[element.key] = x;
              arr['existe'] = "SI";
              //x["$key"] = element.key;


              //this.productObj.push(x as Producto);
            });
            console.log(arr);
            console.log("sale:" + arr['codpro']);
            if (arr['existe'] == 'SI' && arr['cantid'] >  0 ) {
              if (arr['sucursal'] == this.sucursal) {
              this.invoiceId = this.invoiceId + 1;
              this.invoice.push(
                {
                  id: this.invoiceId,
                  sucursal: arr['sucursal'],
                  codpro: arr['codpro'],
                  nompro: arr['nompro'],
                  cantid: 1,
                  punituser: arr['precio2'],
                  codcol: arr['codcol'],
                  descolor: arr['descolor'],
                  talla: arr['talla'],
                  serpro: arr['serpro'],
                  fecvendet: arr['fecvendet']
                });
              }
              else
              {
                this.toastr.warning('Producto esta en otro almace (' + arr['sucursal'] +')');  
              }
            }
            else {
              this.toastr.error('No existe producto');
            }
          });
      }
    }
    else {
      this.toastr.warning('Falta seleccionar Tienda');
    }
  }
}
