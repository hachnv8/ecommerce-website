package org.hacheery.backend.service.impl;

import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.hacheery.backend.entity.Product;
import org.hacheery.backend.exception.DuplicateException;
import org.hacheery.backend.exception.ResourceNotFoundException;
import org.hacheery.backend.exception.SQLException;
import org.hacheery.backend.payload.request.ProductRequest;
import org.hacheery.backend.repository.CategoryRepository;
import org.hacheery.backend.repository.ProductRepository;
import org.hacheery.backend.service.ProductService;
import org.hacheery.backend.specification.ProductSpecification;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @Override
    public Page<Product> getProducts(ProductRequest productRequest, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.searchByParameter(
                productRequest
        );
        return productRepository.findAll(spec, pageable);
    }

    @Override
    public Product getProductById(Long productId) {
        if (productRepository.findById(productId).isPresent()) {
            return productRepository.findById(productId).get();
        } else throw new ResourceNotFoundException("id", "id", productId);
    }

    @Override
    public Product addProduct(Product product) {
        Objects.requireNonNull(product, "Thông tin về sách không được để trống");
        if (StringUtils.isBlank(product.getName()))
            throw new IllegalArgumentException("Tên sách không được để trống");

        if(!categoryRepository.existsById(product.getCategoryId())) {
            throw new ResourceNotFoundException("Category", "id", product.getCategoryId());
        }
        try {
            return productRepository.save(product);
        } catch (DataIntegrityViolationException e) {
            throw new SQLException("Lỗi lưu danh mục vào cơ sở dữ liệu", e);
        }
    }

    @Override
    public Product updateProduct(Long productId, Product updatedProduct) {
        if (productRepository.findById(productId).isPresent()) {
            Product currentProduct = productRepository.findById(productId).get();
            currentProduct.setDescription(updatedProduct.getDescription());
            currentProduct.setName(updatedProduct.getName());
            currentProduct.setPrice(updatedProduct.getPrice());
            currentProduct.setImageUrl(updatedProduct.getImageUrl());
            return productRepository.save(currentProduct);
        } else throw new ResourceNotFoundException("id", "id", productId);
    }

    @Override
    public void deleteProduct(Long productId) {

    }
}
