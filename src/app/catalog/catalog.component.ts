import { Component, OnInit , TemplateRef} from '@angular/core';

import { GLOBAL } from '../common/services/global';
import { LoginService } from '../common/services/login.service';
import { ProductService } from '../common/services/product.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

// model
import { Product } from '../models/product';



export interface Section {
  name: string;  
    
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [LoginService ]
})
export class CatalogComponent implements OnInit {

  productList: Product[];
  identity: any;  
  invoiceCab = [];
  codError:number;
  msgError:string;
  status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,    
    private _productService: ProductService,
  ) {
  }


  ngOnInit() {
    /*
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
      */

      console.log("entrando a validar");
      this.codError = -999;
      
      this._loginService.articulos().subscribe(
        response => {
          console.log("L I S T A   D E   P R O D U C T O S");
            console.log(response);
            this.codError = response.code;
            this.msgError = response.msg;
            this.productList = response.data;
            if(this.codError == 0){
              
                this.status = "success";               
                
            }else{
                this.status = "danger";
            }

        },
        error => {
            console.log(<any>error);
            //console.log("error 454545.");
            var errorMessage = <any>error;
            if (errorMessage != null){
                var body = JSON.parse(error._body);
                this.codError = -1;
            }
        }
    )
      




        this.identity = this._loginService.getIdentity();    
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit CATALOGO");
    console.log(this._loginService.getDataDef());

  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/']);
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
