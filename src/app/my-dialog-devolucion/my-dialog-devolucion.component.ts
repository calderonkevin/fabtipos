import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//service
import { LoginService } from '../common/services/login.service';

// model

import { Ticket } from '../models/ticket';

const ELEMENT_VENTA: Ticket[] = [];

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-my-dialog-devolucion',
  templateUrl: './my-dialog-devolucion.component.html',
  styleUrls: ['./my-dialog-devolucion.component.css']
})

export class MyDialogDevolucionComponent{ 

  

  displayedColumnsVenta: string[] = ['serienumref', 'numref', 'serpro', 'nompro', 'nomcom', 'feccre','sucursal'];
  dataSourceVenta = ELEMENT_VENTA;

  constructor(      
      private _loginService: LoginService,      
      public thisDialogRef: MatDialogRef<MyDialogDevolucionComponent>,
       @Inject(MAT_DIALOG_DATA) public data: string) { }

    /*onCloseConfirm() {        
          localStorage.clear();
            this.thisDialogRef.close('Confirm');

    }*/
  

  /*onCloseCancel() {
     this.thisDialogRef.close('Cancel');
  }*/
  
    consultaRegVentaDetalle(searchValue: string) {
      console.log("consultaRegVentaDetalle"); 
      
      $("#searchPop").select();
   
      this._loginService.consultaRegVentaDetalle(searchValue).subscribe(
        response => {
          console.log("L I S T A   C O N S U L T A   T I C K E T   D E V O L U C I O N");
          console.log(response);
          this.dataSourceVenta = response.data;
          console.log("this.dataSourceVenta:" + this.dataSourceVenta);

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