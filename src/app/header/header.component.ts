import { Component , OnInit} from '@angular/core';

import { Tienda } from '../models/tienda';
import { Categoria } from '../models/categoria';

import { ProductService } from '../common/services/product.service';


export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
 
  tiendaList: Tienda[];
  categoriaList: Categoria[];

  
  constructor(
    private _productService: ProductService,
  ) {
  }

  
  
  ngOnInit() {

    this._productService.getCategoria()
      .snapshotChanges()
      .subscribe(item => {
        this.categoriaList = [];
        //console.log(item.length);
        item.forEach(element => {
          let x = element.payload.toJSON();
          //console.log(element.key);
          x["$key"] = element.key;
          //console.log(element.key);
          this.categoriaList.push(x as Categoria);
        });
      });

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
   
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

}
