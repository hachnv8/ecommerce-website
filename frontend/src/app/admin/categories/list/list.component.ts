import { Component, OnInit } from "@angular/core";

import { Category } from "../category.model";

import { ActivatedRoute, Router } from "@angular/router";
import { LocalStoreService } from "src/app/core/services/local-storage.service";
import { CategoryService } from "../category.service";
import { IPaginationInputV2, IPaginationResult } from "src/app/shared/models/pagination.model";
import { identity, pickBy } from "lodash";
import { finalize } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})


export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  categories: IPaginationResult;
  page: any = 1;
  paginationInput: IPaginationInputV2;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStoreService: LocalStoreService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Categories" },
      { label: "Categories List", active: true },
    ];
    this.readUrl
    this.getCategories(this.paginationInput);
  }


  getCategories(paginationInput: IPaginationInputV2) {
    this.categoryService.getCategories(paginationInput).pipe(
      finalize(() => {
        this.rewriteUrl(this.paginationInput);
      })
    ).subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  protected readUrl(): void {
    this.paginationInput = {
      limit: parseInt(this.activatedRoute.snapshot.queryParams.limit) || 10,
      page: parseInt(this.activatedRoute.snapshot.queryParams.page) || 1,
      sort: this.activatedRoute.snapshot.queryParams.sort || "created_at",
      order: parseInt(this.activatedRoute.snapshot.queryParams.order) || -1,
      search: this.activatedRoute.snapshot.queryParams.search,
    };
  }


  protected rewriteUrl(queryParams = {}) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: pickBy(queryParams, identity),
      // queryParamsHandling: 'merge'
    });
  }
}
