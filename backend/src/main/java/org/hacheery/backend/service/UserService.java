package org.hacheery.backend.service;

import org.hacheery.backend.model.CurrentUser;
import org.hacheery.backend.payload.request.UserRequest;
import org.hacheery.backend.security.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User createUser(@CurrentUser User currentUser, User user, MultipartFile file);

    Page<User> getUsers(UserRequest userRequest, Pageable pageable);

    User getUserById(Long userId);

    User getUserByEmail(String email);

    void updateUser(@CurrentUser User currentUser, Long userId, User user);

    void deleteUser(Long userId);

    void deleteUsers();
}
