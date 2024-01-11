import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OverviewComponent } from "./overview/overview.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
  },
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "overview",
    component: OverviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
