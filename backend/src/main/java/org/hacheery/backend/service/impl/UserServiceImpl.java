package org.hacheery.backend.service.impl;

import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hacheery.backend.exception.DuplicateException;
import org.hacheery.backend.exception.ResourceNotFoundException;
import org.hacheery.backend.exception.SQLException;
import org.hacheery.backend.model.CurrentUser;
import org.hacheery.backend.payload.request.UserRequest;
import org.hacheery.backend.security.entity.Role;
import org.hacheery.backend.security.entity.User;
import org.hacheery.backend.security.repository.UserRepository;
import org.hacheery.backend.service.UserService;
import org.hacheery.backend.specification.UserSpecification;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UploadServiceImpl uploadService;
    @Override
    @Transactional
    public User createUser(@CurrentUser User currentUser, User user, MultipartFile file) {
        Objects.requireNonNull(user, "Thông tin về user không được để trống");
        System.out.println(currentUser.getRole());
        if(currentUser.getRole() != Role.ADMIN) throw new AccessDeniedException("Bạn không có quyền tạo user mới");
        if (StringUtils.isBlank(user.getUsername()))
            throw new IllegalArgumentException("Tên user không được để trống");
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateException("Username này đã được sử dụng");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateException("Email này đã được sử dụng");
        }
        if(userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new DuplicateException("Số điện thoại này đã được sử dụng");
        }
        try {
            String imageInformation = uploadService.uploadImage(file.getBytes());
            String[] parts = imageInformation.split(",");
            String imageUrl = parts[parts.length-1].split("=")[1].trim();
            imageUrl = imageUrl.substring(0, imageUrl.length()-1);
            user.setImgUrl(imageUrl);
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new SQLException("Lỗi lưu danh mục vào cơ sở dữ liệu", e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<User> getUsers(UserRequest userRequest, Pageable pageable) {
        Specification<User> spec = UserSpecification.searchByParameter(
                userRequest
        );
        return userRepository.findAll(spec, pageable);
    }

    @Override
    public User getUserById(Long userId) {
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return null;
    }

    @Override
    public void updateUser(@CurrentUser User currentUser,Long userId, User updatedUser) {
        if(currentUser.getId().equals(userId) || currentUser.getRole() == Role.ADMIN) {
            User existingUser = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "ID", userId));

            // Cập nhật thông tin người dùng
            if(!updatedUser.getName().isEmpty()) existingUser.setName(updatedUser.getName());
            if(!updatedUser.getAddress().isEmpty()) existingUser.setAddress(updatedUser.getAddress());
            existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
            String allCountryRegex = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
            if(String.valueOf(updatedUser.getPhoneNumber()).matches(allCountryRegex)) {
                existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            }
            if(updatedUser.getRole() != null) existingUser.setRole(updatedUser.getRole());
            userRepository.save(existingUser);
        } else throw new AuthorizationServiceException("Bạn không có quyền hạn để sửa thông tin user");
    }

    @Override
    public void deleteUser(Long userId) {

    }

    @Override
    public void deleteUsers() {
        userRepository.deleteAll();
    }
}
