import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Tienda } from '../models/tienda';

import { ProductService } from '../common/services/product.service';

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
 tiendaList: Tienda[];
  constructor(
      private _productService: ProductService,
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

      this._productService.getTienda()
      .snapshotChanges()
      .subscribe(item => {
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

   }

}