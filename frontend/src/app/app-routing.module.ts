import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { Page404Component } from './extrapages/page404/page404.component';
import { LayoutComponent } from './admin/layouts/layout.component';

const routes: Routes = [
  {
    path: "admin",
    component: LayoutComponent,
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./regular/regular.module").then((m) => m.RegularModule),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./extrapages/extrapages.module").then((m) => m.ExtrapagesModule),
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
