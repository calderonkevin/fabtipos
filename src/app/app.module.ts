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
import { MyDialogComponent } from './my-dialog/my-dialog.component';

//material
import { MaterialModule } from './zmaterial/material';

//toastr
import { ToastrModule } from 'ngx-toastr';

import {MatDialogModule} from '@angular/material';
//animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//firebase
import{ AngularFireModule} from 'angularfire2';
import{ AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';

import { routing, appRoutingProviders }  from './app.routing';
import { HttpModule } from '@angular/http';

// services
import { LoginService } from './common/services/login.service';
import { AdminGuard } from './common/services/admin.guard';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent, ShopComponent, CatalogComponent, LoginComponent, ZnoexisteComponent,MyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    MaterialModule,
    HttpModule,
    FormsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [LoginService, ProductService, appRoutingProviders, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
