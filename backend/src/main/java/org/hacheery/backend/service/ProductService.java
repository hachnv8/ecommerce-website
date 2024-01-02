package org.hacheery.backend.service;


import org.hacheery.backend.entity.Product;
import org.hacheery.backend.payload.request.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<Product> getProducts(ProductRequest bookRequest, Pageable pageable);

    Product getProductById(Long bookId);

    Product addProduct(Product book);

    Product updateProduct(Long bookId, Product updatedProduct);

    void deleteProduct(Long bookId);
}
