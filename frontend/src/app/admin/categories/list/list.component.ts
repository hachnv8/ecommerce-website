import { Component, OnInit } from "@angular/core";

import { Category } from "../category.model";

import { categoryData } from "../categorydata";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})


export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  categoryData: Category[];
  page: any = 1;

  constructor() {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Categories" },
      { label: "Categories List", active: true },
    ];

  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        debugger;
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
