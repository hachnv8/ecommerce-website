import { AdminComponent } from "./admin.component";
import { Route, Router, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthAdminGuard } from "./admin.guard";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthAdminGuard],
    children: [
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
      {
        path: "products",
        loadChildren: () =>
          import("./products/products.module").then((m) => m.ProductsModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
