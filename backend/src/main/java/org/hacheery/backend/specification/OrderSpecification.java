package org.hacheery.backend.specification;

import jakarta.persistence.criteria.Predicate;
import org.hacheery.backend.entity.Order;
import org.hacheery.backend.payload.request.OrderRequest;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecification {
    public static Specification<Order> searchByParameter(OrderRequest orderRequest) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

//            if(shouldIncludeCategoryName(orderRequest.ge())) {
//                predicate = cb.and(predicate, cb.like(root.get("categoryName"), "%"
//                + orderRequest.getCategoryName() + "%"));
//            }
//            if(shouldIncludeParentId(orderRequest.getParentId())) {
//                predicate = cb.and(predicate, cb.equal(root.get("parentId"), orderRequest.getParentId()));
//            }

            return predicate;
        };
    }

    private static boolean shouldIncludeCategoryName(String catName) {
        return catName != null && !catName.isEmpty();
    }

    private static boolean shouldIncludeParentId(Long parentId) {
        return parentId != null;
    }
}
