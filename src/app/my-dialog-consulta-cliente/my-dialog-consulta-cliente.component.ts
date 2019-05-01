import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//service
import { LoginService } from '../common/services/login.service';

// model

import { Ticket } from '../models/ticket';

const ELEMENT_VENTA: Ticket[] = [];

declare var jQuery: any;
declare var $: any;


export interface ExternoCliente {
  inden: string;
  desinden: string;
  codcli: string;
  nomcom: string;
  dircli: string;
}

@Component({
  selector: 'app-my-dialog-consulta-cliente',
  templateUrl: './my-dialog-consulta-cliente.component.html',
  styleUrls: ['./my-dialog-consulta-cliente.component.css']
})

export class MyDialogConsultaClienteComponent {



  displayedColumnsVenta: string[] = ['serienumref', 'numref', 'serpro', 'nompro', 'nomcom', 'feccre', 'sucursal'];
  dataSourceVenta = ELEMENT_VENTA;



  constructor(
    private _loginService: LoginService,
    public thisDialogRef: MatDialogRef<MyDialogConsultaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    console.log("aaa" + this.externoClienteObj.codcli);
  }

  selectedTipoDocValue: string = "RUC";
  externoClienteObj: ExternoCliente = {
    inden: "",
    desinden: "",
    codcli: "",
    nomcom: "",
    dircli: ""
  };

  /*onCloseConfirm() {        
        localStorage.clear();
          this.thisDialogRef.close('Confirm');

  }*/


  /*onCloseCancel() {
     this.thisDialogRef.close('Cancel');
  }*/

  ngOnInit() {
    var wgetdatadef = this._loginService.getDataDef();
    this._loginService.consultaRucClienteInterno(wgetdatadef.codcli).subscribe(
      response => {
        console.log("L I S T A   C O N S U L T A   RUC/DNI I N T E R N O");
        console.log(response);
        if (response['count'] > 0) {
          this.externoClienteObj.codcli = response['data']['codcli'];
          this.externoClienteObj.nomcom = response['data']['nomcom'];
          this.externoClienteObj.dircli = response['data']['dircli'];
          this.externoClienteObj.inden = response['data']['inden'];
          this.externoClienteObj.desinden = response['data']['desinden'];;
        } else {
                this.externoClienteObj.codcli = "";
                this.externoClienteObj.nomcom = "";
                this.externoClienteObj.dircli = "";
        }
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

  consultarDatosCliente() {
    console.log("consultarDatosCliente");
    var searchValue: string = $("#searchPop").val();
    console.log(searchValue);

    this._loginService.consultaRucClienteInterno(searchValue).subscribe(
      response => {
        console.log("L I S T A   C O N S U L T A   RUC/DNI I N T E R N O");
        console.log(response);
        if (response['count'] > 0) {
          this.externoClienteObj.codcli = response['data']['codcli'];
          this.externoClienteObj.nomcom = response['data']['nomcom'];
          this.externoClienteObj.dircli = response['data']['dircli'];
          this.externoClienteObj.inden = response['data']['inden'];
          this.externoClienteObj.desinden = response['data']['desinden'];;
        } else {



          this._loginService.consultaRucClienteExterno(this.selectedTipoDocValue, searchValue).subscribe(
            response => {
              console.log("L I S T A   C O N S U L T A   RUC/DNI E X T E R N O");
              console.log(response);
              if (response['success'] != "false" && response['success'] != false) {
                if (this.selectedTipoDocValue == "RUC") {

                  this.externoClienteObj.codcli = response['result']['RUC'];
                  this.externoClienteObj.nomcom = response['result']['RazonSocial'];
                  this.externoClienteObj.dircli = response['result']['Direccion'];
                  this.externoClienteObj.inden = "000001";
                  this.externoClienteObj.desinden = "RUC.";
                } else {
                  this.externoClienteObj.codcli = response['result']['DNI'];
                  this.externoClienteObj.nomcom = response['result']['Nombres'] + ' ' + response['result']['apellidos'];
                  this.externoClienteObj.dircli = 'LIMA';
                  this.externoClienteObj.inden = "000005";
                  this.externoClienteObj.desinden = "DNI";
                }
              }
              else {
                this.externoClienteObj.codcli = "";
                this.externoClienteObj.nomcom = "";
                this.externoClienteObj.dircli = "";
              }

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