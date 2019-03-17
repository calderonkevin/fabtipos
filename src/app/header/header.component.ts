import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Category } from '../models/category';
import { LoginService } from '../common/services/login.service';
import { ProductService } from '../common/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Dialog
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { CatalogComponent } from '../catalog/catalog.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit {

  categoriaList: Category[];
  identity: any;
  datadef: any;
  descuento = 0;
  tipoDescuento = 0;

  constructor(
    private _loginService: LoginService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog,
    private catalogComponent: CatalogComponent,
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
          this.categoriaList.push(x as Category);
        });
      });


    this.identity = this._loginService.getIdentity();
    this.datadef = this._loginService.getDataDef()
    //this.invoiceCab = [{'codcli':'5','coddir':'0001','codper':'44001713','nomcom':'otros mas'}];
    //this.invoiceCab = this._loginService.getDataDef();
    console.log("entra a oninit HEAD");
    console.log(this._loginService.getDataDef());

  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/']);
  }

  onSearchChange(searchValue: string) {
    //console.log("Ingresa con enter");
    //console.log(searchValue);

    this.catalogComponent.loadCatalogo(searchValue);

    /*$("#txtBusqueda").select();
    if (searchValue.startsWith("0")) {
      $("#detectabarra").val(searchValue);
      $("#btnejecuta").click();
    }
    else {
      console.log("no hace nada")
    }
    return;*/


  }

  openDialog(): void {

    let dialogRefDes = this.dialog.open(MyDialogComponent, {
      width: '450px',
      // data: { name: this.name, animal: this.animal }
      //data: ''
      data: {
        descuento: this.descuento,
        tipoDescuento: this.tipoDescuento,

      }
    });

    dialogRefDes.afterClosed().subscribe(result => {
      //alert(result);

      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }



}
