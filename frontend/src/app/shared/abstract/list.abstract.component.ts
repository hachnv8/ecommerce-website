import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { identity, merge, pickBy } from 'lodash';

import { IBulkActionOption, IPaginationInputV2 } from '../models/pagination.model';


export abstract class ListAbstractComponent implements OnInit {
  loading: boolean;
  filtersExpanded: boolean;

  paginationInput: IPaginationInputV2;
  displayedColumns: string[];
  docs: any[];
  actions: IBulkActionOption[];
  length = 0;
  pageSize = 20;

  private filtersName: string;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected localStoreService: LocalStor
  ) {
    this.filtersName = `filterset_tog_${activatedRoute.snapshot.routeConfig.component.name}`;
    this.filtersExpanded = localStoreService.get(this.filtersName);
  }

  ngOnInit() {
    this.readUrl();
    this.loadData();
  }

  loadData(query = {}): void {
    this.loading = true;
    merge(this.paginationInput, query);
  }

  do($event: { action: string, data: object } | {} = {}): void {
    // console.debug($event);
  }

  toggleFilters() {
    this.filtersExpanded = !this.filtersExpanded;
    this.localStoreService.set(this.filtersName, this.filtersExpanded);
  }

  protected readUrl(): void {
    this.paginationInput = {
      limit: parseInt(this.activatedRoute.snapshot.queryParams.limit) || 10,
      page: parseInt(this.activatedRoute.snapshot.queryParams.page) || 1,
      sort: this.activatedRoute.snapshot.queryParams.sort || 'created_at',
      order: parseInt(this.activatedRoute.snapshot.queryParams.order) || -1,
      search: this.activatedRoute.snapshot.queryParams.search
    };
  }

  protected rewriteUrl(queryParams = {}) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: pickBy(queryParams, identity)
      // queryParamsHandling: 'merge'
    });
  }

}
