import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';

import { AngularDropdownModule } from 'angular-dropdown';

import { NgxPrimengGridComponent } from './grid/ngx-primeng-grid.component';
import { GridCustomTemplate } from './directives/grid.template';


const components = [
  NgxPrimengGridComponent,
  GridCustomTemplate
];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
    AngularDropdownModule,
    InputSwitchModule,
    TooltipModule
  ],
  providers: [ConfirmationService],
  exports: [...components]
})
export class NgxPrimengGridModule { }
