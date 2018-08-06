import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from 'app/core/core.module';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

// Components
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,

    // Material
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatRadioModule,
    MatListModule,
    MatTabsModule,
    MatDividerModule,
    MatTableModule
  ],
  exports: [
    // Material
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
    MatRadioModule,
    MatListModule,
    MatTabsModule,
    MatDividerModule,
    MatTableModule,

    // Components
    ...fromComponents.components
  ],
  declarations: [
    ...fromComponents.components
  ]
})
export class LayoutModule { }
