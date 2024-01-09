import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStoreService } from './services/local-storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [LocalStoreService]
})
export class CoreModule { }
