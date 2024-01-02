package org.hacheery.backend.specification;

import jakarta.persistence.criteria.Predicate;
import org.hacheery.backend.entity.Product;
import org.hacheery.backend.payload.request.ProductRequest;
import org.springframework.data.jpa.domain.Specification;

/**
 * Created by HachNV on 10/07/2023
 */
public class ProductSpecification {
    public static Specification<Product> searchByParameter(ProductRequest productRequest) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if(shouldIncludeProductName(productRequest.getName())) {
                predicate = cb.and(predicate, cb.like(root.get("name"), "%"
                + productRequest.getName() + "%"));
            }
            return predicate;
        };
    }

    private static boolean shouldIncludeProductName(String prodName) {
        return prodName != null && !prodName.isEmpty();
    }
}
