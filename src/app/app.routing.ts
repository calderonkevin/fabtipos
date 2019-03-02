import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ZnoexisteComponent } from './znoexiste/znoexiste.component';

import { AdminGuard } from './common/services/admin.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const appRoutes: Routes = [    
    {path: '', component: LoginComponent},    
    //{path: '', component: CatalogComponent},
    {path: '', redirectTo: 'login' , pathMatch: 'full'},
    {canActivate: [AdminGuard], path: 'catalogo', component: CatalogComponent},
    {path: '**', component: ZnoexisteComponent}
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
