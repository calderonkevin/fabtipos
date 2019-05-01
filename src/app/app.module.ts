import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent }  from './header/header.component';
import { ShopComponent }  from './shop/shop.component';
import { TransfComponent }  from './transf/transf.component';
import { DevolucionComponent }  from './devolucion/devolucion.component';
import { CatalogComponent }  from './catalog/catalog.component';
import { LoginComponent }  from './login/login.component';
import { ZnoexisteComponent }  from './znoexiste/znoexiste.component';
import { ProductService } from './common/services/product.service';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MyDialogEditarPrecioComponent } from './my-dialog/my-dialog-editar-precio.component';
import { MyDialogDevolucionComponent } from './my-dialog-devolucion/my-dialog-devolucion.component';
import { MyDialogConsultaClienteComponent } from './my-dialog-consulta-cliente/my-dialog-consulta-cliente.component';

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
    AppComponent, HeaderComponent, ShopComponent, TransfComponent
    , DevolucionComponent, CatalogComponent, LoginComponent, ZnoexisteComponent
    , MyDialogComponent, MyDialogEditarPrecioComponent, MyDialogDevolucionComponent
    , MyDialogConsultaClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-center-center'}), 
    MaterialModule,
    HttpModule,
    FormsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  entryComponents: [
    MyDialogComponent,
    MyDialogEditarPrecioComponent,
    MyDialogDevolucionComponent,
    MyDialogConsultaClienteComponent
  ],
  providers: [LoginService, ProductService, appRoutingProviders, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
