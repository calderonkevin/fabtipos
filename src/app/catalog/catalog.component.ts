import { Component, OnInit } from '@angular/core';

// model
import { Product } from '../models/product';

import { ProductService } from '../common/services/product.service';

export interface Section {
  name: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productList: Product[];
  

  constructor(
    private _productService: ProductService,
  ) {
  }


  ngOnInit() {

    this._productService.getProduct()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        //console.log(item.length);
        item.forEach(element => {
          let x = element.payload.toJSON();
          //console.log(element.key);
          x["$key"] = element.key;
          //console.log(element.key);
          this.productList.push(x as Product);
        });
      });

      




    //    this.identity = this._loginService.getIdentity();    
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    //  this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit");
    //console.log(this._loginService.getDataDef());

  }

  products: Section[] = [
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },
    { name: 'Photos' },

  ];
}
