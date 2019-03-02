import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent }  from './header/header.component';
import { ShopComponent }  from './shop/shop.component';
import { CatalogComponent }  from './catalog/catalog.component';
import { LoginComponent }  from './login/login.component';
import { ZnoexisteComponent }  from './znoexiste/znoexiste.component';
import { ProductService } from './common/services/product.service';
//material
import { MaterialModule } from './zmaterial/material';

//animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//firebase
import{ AngularFireModule} from 'angularfire2';
import{ AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';

import { routing, appRoutingProviders }  from './app.routing';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, ShopComponent, CatalogComponent, LoginComponent, ZnoexisteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [ProductService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
