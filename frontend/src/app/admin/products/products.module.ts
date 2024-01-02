import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { UIModule } from '../../shared/ui/ui.module';

import {JobsRoutingModule} from "./products-routing.module";
import { ListComponent } from './list/list.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    UIModule,
    JobsRoutingModule,
  ],
  providers: [BsModalService]
})

export class ProductsModule { }
