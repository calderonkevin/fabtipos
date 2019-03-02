import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent }  from './header/header.component';
import { ShopComponent }  from './shop/shop.component';
import { CatalogComponent }  from './catalog/catalog.component';
import { ProductService } from './common/services/product.service';
//material
import { MaterialModule } from './zmaterial/material';

//animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//firebase
import{ AngularFireModule} from 'angularfire2';
import{ AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent, ShopComponent, CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
