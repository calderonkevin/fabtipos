import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent }  from './header/header.component';
import { ShopComponent }  from './shop/shop.component';
import { CatalogComponent }  from './catalog/catalog.component';
import { Header2Component }  from './header2/header2.component';
import { Shop2Component }  from './shop2/shop2.component';
import { Catalog2Component }  from './catalog2/catalog2.component';
import { LoginComponent }  from  './login/login.component';

//material
import { MaterialModule } from './zmaterial/material';

import { MyDialogComponent } from './my-dialog/my-dialog.component';
//animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent, ShopComponent, CatalogComponent, LoginComponent, Header2Component, Shop2Component, Catalog2Component, MyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    MyDialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
