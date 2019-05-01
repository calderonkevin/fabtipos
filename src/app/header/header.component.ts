import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Category } from '../models/category';
import { LoginService } from '../common/services/login.service';
import { ProductService } from '../common/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Dialog

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

  @Output() pasameMenu = new EventEmitter();    
  menuTipcodope:string;
  menuDesTipcodope:string;
  categoriaList: Category[];
  identity: any;
  datadef: any;
  descuento = 0;
  tipoDescuento = 0;
  searchValue: string;
  constructor(
    private _loginService: LoginService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog,
    private catalogComponent: CatalogComponent,
    
  ) {
    
  }

  miMenu(tipoMenu){
    this.menuTipcodope = tipoMenu;
    if(this.menuTipcodope == "VENTA"){
      this.menuDesTipcodope = "Venta";
    }else if(this.menuTipcodope == "TRANSF"){
      this.menuDesTipcodope = "Transferencia";
    }else if(this.menuTipcodope == "DEVOL"){
      this.menuDesTipcodope = "Devolución";
    }else{
      this.menuTipcodope = "";
      this.menuDesTipcodope = "No existe Opción";
    }
    
    this.emitirEvento();
  }


  emitirEvento(){
    console.log("aaaaaaaaaa ssssssssssssssssss");
    this.pasameMenu.emit({
      'menuTipcodope': this.menuTipcodope,
      'menuDesTipcodope': this.menuDesTipcodope      
    })

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

    console.log("E N T R A N D O  AL SSS");
    this.miMenu("VENTA");
    //this.miMenu("TRANSF");
    //this.miMenu("DEVOL");

  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/']);
  }

  onSearchChange(searchValue: string) {
    //console.log("Ingresa con enter");
    //console.log(searchValue);
    //if (searchValue != "") {
      this.catalogComponent.loadCatalogo(searchValue);
    //}

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

  testPrint(){
    var tmpLista = this._loginService.getDataDef();
    window.open(tmpLista["rutaimp"] + 'testPrinter.php', 'iframeImpresion');
    
    
  }

}
