import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Category } from "./category.model";
import {
  IPaginationInputV2,
  IPaginationResult,
} from "src/app/shared/models/pagination.model";
import { AbstractService } from "src/app/shared/abstract/abstract.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }

  getCategories(params: IPaginationInputV2 = {}): Observable<IPaginationResult> {
    return this.http.get<IPaginationResult>(`${environment.apiUrl}admin/categories`, { params: this.toHttpParams(params) });
  }
  getCategoryById(categoryId: number): Observable<Category> { 
    return this.http.get<Category>(`${environment.apiUrl}/categories/${categoryId}`);
  }
  deleteCategory(categoryId: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/categories/${categoryId}`);
  }
  // updateCategory(
  //   id: number,
  //   updatedCategory: UpdateCategoryDTO
  // ): Observable<UpdateCategoryDTO> {
  //   return this.http.put<Category>(
  //     `${environment.apiUrl}/categories/${id}`,
  //     updatedCategory
  //   );
  // }
  // insertCategory(insertCategoryDTO: InsertCategoryDTO): Observable<any> {
  //   // Add a new category
  //   return this.http.post(`${environment.apiUrl}/categories`, insertCategoryDTO);
  // }
}
