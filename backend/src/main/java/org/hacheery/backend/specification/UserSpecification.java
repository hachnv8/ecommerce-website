package org.hacheery.backend.specification;


import jakarta.persistence.criteria.Predicate;
import org.hacheery.backend.payload.request.UserRequest;
import org.hacheery.backend.security.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {
    public static Specification<User> searchByParameter(UserRequest userRequest) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if(shouldIncludeUsername(userRequest.getName())) {
                predicate = cb.and(predicate, cb.like(root.get("name"), "%"
                + userRequest.getName() + "%"));
            }
            return predicate;
        };
    }

    private static boolean shouldIncludeUsername(String username) {
        return username != null && !username.isEmpty();
    }
}
