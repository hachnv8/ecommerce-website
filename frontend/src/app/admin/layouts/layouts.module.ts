import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SimplebarAngularModule } from 'simplebar-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { VerticalComponent } from './vertical/vertical.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent, FooterComponent, RightsidebarComponent, VerticalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    SimplebarAngularModule
  ],
  providers: [LanguageService]
})
export class LayoutsModule { }
