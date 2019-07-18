import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//service
import { LoginService } from '../common/services/login.service';

// model

import { Ticketdet } from '../models/ticketdet';

const ELEMENT_VENTADET: Ticketdet[] = [];

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-my-dialog-venta-detalle',
  templateUrl: './my-dialog-venta-detalle.component.html',
  styleUrls: ['./my-dialog-venta-detalle.component.css']
})

export class MyDialogVentaDetalleComponent {



  displayedColumnsVentaDet: string[] = [ 'serpro', 'nompro', 'descolor' , 'cantid' , 'punit'];
  dataSourceVentaDet = ELEMENT_VENTADET;

  identity: any;

  constructor(
    private _loginService: LoginService,
    public thisDialogRef: MatDialogRef<MyDialogVentaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    dataDef = [];
  ngOnInit() {
    this.dataDef = this._loginService.getDataDef();
    console.log( JSON.stringify(this.data) );

    this.identity = this._loginService.getIdentity();

    this.loadTicketDetPorNumcodope(this.data);

  }

  loadTicketDetPorNumcodope(data: any) {
    console.log("loadTicketDetPorNum");
    console.log("data" + JSON.stringify(data));
    console.log("data.sucursal, data.numcodope " + data.element.sucursal + data.element.numcodope);
    this._loginService.reImpresionTicketPos(data.element.sucursal , data.element.numcodope).subscribe(
      response => {
        console.log("L I S T A   D E   T I C K E T   D E T A L L E   P O R   N U M C O D O P E");
        console.log(response);
        //var impText = [{ 'invoicecab': response.dataCab, 'invoice': response.dataDet, }];
        this.dataSourceVentaDet = response.dataDet;
        console.log("this.dataSourceVentaDet:" + this.dataSourceVentaDet);

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

  /*onCloseConfirm() {        
        localStorage.clear();
          this.thisDialogRef.close('Confirm');

  }*/


  /*onCloseCancel() {
     this.thisDialogRef.close('Cancel');
  }*/

}