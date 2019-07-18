import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../common/services/login.service';

declare var jQuery: any;
declare var $: any;




@Component({
  selector: 'app-my-dialog-editar-precio',
  templateUrl: './my-dialog-editar-precio.component.html',
  styleUrls: ['./my-dialog-editar-precio.component.css']
})


export class MyDialogEditarPrecioComponent {

  dataDef = [];

  constructor(
    private _loginService: LoginService,
    public thisDialogRef: MatDialogRef<MyDialogEditarPrecioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  /*onCloseConfirm() {
      this.cart=null;
        localStorage.clear();
          this.thisDialogRef.close('Confirm');

  }*/


  /*onCloseCancel() {
     this.thisDialogRef.close('Cancel');
  }*/
  ngOnInit() {    
    this.dataDef = this._loginService.getDataDef();
  }
}