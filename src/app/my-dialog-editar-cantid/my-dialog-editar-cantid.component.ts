import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../common/services/login.service';

declare var jQuery: any;
declare var $: any;




@Component({
  selector: 'app-my-dialog-editar-cantid',
  templateUrl: './my-dialog-editar-cantid.component.html',
  styleUrls: ['./my-dialog-editar-cantid.component.css']
})


export class MyDialogEditarCantidComponent {

  dataDef = [];

  constructor(
    private _loginService: LoginService,
    public thisDialogRef: MatDialogRef<MyDialogEditarCantidComponent>,
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