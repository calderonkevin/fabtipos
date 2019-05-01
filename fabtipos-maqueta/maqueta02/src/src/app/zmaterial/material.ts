import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [MatButtonModule
    , MatCheckboxModule
    , MatToolbarModule
    , MatIconModule
    , MatMenuModule
    , MatInputModule
    , MatListModule
    , MatCardModule
    , MatSelectModule
    , MatAutocompleteModule
    , MatTabsModule
    , MatTableModule
    , MatDialogModule
  ],
  exports: [MatButtonModule
    , MatCheckboxModule
    , MatToolbarModule
    , MatIconModule
    , MatMenuModule
    , MatInputModule
    , MatListModule
    , MatCardModule
    , MatSelectModule
    , MatAutocompleteModule
    , MatTabsModule
    , MatTableModule
    , MatDialogModule
  ],
})
export class MaterialModule { } 