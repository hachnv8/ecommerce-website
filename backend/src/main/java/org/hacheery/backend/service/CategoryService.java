package org.hacheery.backend.service;

import org.hacheery.backend.entity.Category;
import org.hacheery.backend.payload.request.CategoryRequest;
import org.springframework.data.domain.Page;

public interface CategoryService {
    Page<Category> getCategories(CategoryRequest request);

    Category getCategoryById(Long id);

    Category addCategory(Category category);

    Category updateCategory(Long id, Category category);

    void deleteCategory(Long id);
}
