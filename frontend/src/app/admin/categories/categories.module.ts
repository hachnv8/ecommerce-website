import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

// dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgApexchartsModule } from 'ng-apexcharts';

import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListComponent, OverviewComponent, CreateComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    UIModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    NgApexchartsModule,
    NgxDropzoneModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ]
})

export class CategoriesModule { }
