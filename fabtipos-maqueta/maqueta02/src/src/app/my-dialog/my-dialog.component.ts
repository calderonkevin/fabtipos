import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})


export class MyDialogComponent{
  
 public cart=[];
  constructor(
 
      public thisDialogRef: MatDialogRef<MyDialogComponent>,
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

      

   }

}