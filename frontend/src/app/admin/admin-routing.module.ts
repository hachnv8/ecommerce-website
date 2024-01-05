import { AdminComponent } from "./admin.component";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "categories",
        pathMatch: "full",
      },
      {
        path: "categories",
        loadChildren: () =>
          import("./categories/categories.module").then((m) => m.CategoriesModule),
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
