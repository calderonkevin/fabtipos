import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//service
import { LoginService } from '../common/services/login.service';

// model

import { Ticket } from '../models/ticket';

//toastr
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    public thisDialogRef: MatDialogRef<MyDialogConsultaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    console.log("aaa" + this.externoClienteObj.codcli);
  }
  loading = false;
  codConsultaDocumento: number = 0;
  selectedTipoDocValue: string = "RUC";  
  externoClienteList: ExternoCliente[];
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
    this.focusSearchPop();
    
    /*
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
          this.externoClienteObj.desinden = response['data']['desinden'];
          this.codConsultaDocumento = 1;
        } else {
                this.externoClienteObj.codcli = "";
                this.externoClienteObj.nomcom = "";
                this.externoClienteObj.dircli = "";
                this.codConsultaDocumento = 2;
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
    */
  }

  consultarDatosCliente() {
    console.log("consultarDatosCliente");
    //var searchValue: string = $("#searchPop").val();
    var searchValue: string = $("#searchPop").val();
    console.log(searchValue);
    console.log(this.selectedTipoDocValue);
    this.codConsultaDocumento = 0;
    this.loading = true;

    /////////// inicio validar factura
    var totLenght = searchValue.trim().length;
    console.log(totLenght);
    /*
    if (totLenght != 2 && totLenght != 8 && totLenght != 11) {
      this.selectedTipoDocValue = "";
      this.externoClienteObj.codcli = "";
      this.externoClienteObj.nomcom = "";
      this.externoClienteObj.dircli = "";
      this.codConsultaDocumento = 2;
      this.loading = false;
      return
    }
    */
   
    if (totLenght == 11) {
      this.selectedTipoDocValue = "RUC";
    } else if (totLenght == 8) {
      this.selectedTipoDocValue = "DNI";
    }
    else {
      this.selectedTipoDocValue = "";
    }


    this._loginService.consultaRucClienteInterno(searchValue).subscribe(
      response => {
        console.log("L I S T A   C O N S U L T A   RUC/DNI I N T E R N O");
        console.log(response);
        if (response['count'] > 0) {
          this.externoClienteList = response.data;
          this.externoClienteObj.codcli = response['data']['codcli'];
          this.externoClienteObj.nomcom = response['data']['nomcom'];
          this.externoClienteObj.dircli = response['data']['dircli'];
          this.externoClienteObj.inden = response['data']['inden'];
          this.externoClienteObj.desinden = response['data']['desinden'];
          this.codConsultaDocumento = 1;
          this.loading = false;
        } else {

          if (totLenght != 8 && totLenght != 11) {
            this.externoClienteObj.codcli = "";
            this.externoClienteObj.nomcom = "";
            this.externoClienteObj.dircli = "";
            this.codConsultaDocumento = 2;
            this.loading = false;
            return;
          }

          this._loginService.consultaRucClienteExterno(this.selectedTipoDocValue, searchValue).subscribe(
            response => {
              console.log("L I S T A   C O N S U L T A   " +  this.selectedTipoDocValue +" E X T E R N O");
              console.log(response);
              if (response['success'] != "false" && response['success'] != false) {
                if (this.selectedTipoDocValue == "RUC") {

                  this.externoClienteObj.codcli = response['result']['RUC'];
                  this.externoClienteObj.nomcom = response['result']['RazonSocial'];
                  this.externoClienteObj.dircli = response['result']['Direccion'];
                  this.externoClienteObj.inden = "000001";
                  this.externoClienteObj.desinden = "RUC";                                                                        

                  var externoClienteList: ExternoCliente[] = [
                    {
                      inden: "000001",
                      desinden: "RUC",
                      codcli: response['result']['RUC'],
                      nomcom: response['result']['RazonSocial'],
                      dircli: response['result']['Direccion']}
                  ];

                  this.externoClienteList = externoClienteList;
                  
                  this.codConsultaDocumento = 1;
                } else {
                  this.externoClienteObj.codcli = response['result']['DNI'];
                  this.externoClienteObj.nomcom = response['result']['Nombres'] + ' ' + response['result']['apellidos'];
                  this.externoClienteObj.dircli = 'LIMA';
                  this.externoClienteObj.inden = "000005";
                  this.externoClienteObj.desinden = "DNI";
                  var externoClienteList: ExternoCliente[] = [
                    {
                      inden: "000005",
                      desinden: "DNI",
                      codcli: response['result']['DNI'],
                      nomcom: response['result']['Nombres'] + ' ' + response['result']['apellidos'],
                      dircli: 'LIMA'}
                  ];
                  this.externoClienteList = externoClienteList;

                  this.codConsultaDocumento = 1;
                }
              }
              else {
                this.externoClienteObj.codcli = "";
                this.externoClienteObj.nomcom = "";
                this.externoClienteObj.dircli = "";
                
                var externoClienteList: ExternoCliente[] = [
                  {
                    inden: "",
                    desinden: "",
                    codcli: "",
                    nomcom: "",
                    dircli: ""}
                ];
                this.externoClienteList = externoClienteList;

                this.codConsultaDocumento = 2;
              }
              this.loading = false;
            },
            error => {
              this.loading = false;
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
        this.loading = false;
        console.log(<any>error);
        //console.log("error 454545.");
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
        }
      }
    )
    $("#searchPop").focus();
  }

  focusSearchPop() {
    this.codConsultaDocumento = 0;
    $("#searchPop").focus();
  }

}