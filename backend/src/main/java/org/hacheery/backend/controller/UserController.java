package org.hacheery.backend.controller;


import lombok.RequiredArgsConstructor;
import org.hacheery.backend.model.CurrentUser;
import org.hacheery.backend.payload.request.UserRequest;
import org.hacheery.backend.security.entity.User;
import org.hacheery.backend.service.impl.UserServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserServiceImpl userService;

    @GetMapping
    public ResponseEntity<Page<User>> getUsers(@ModelAttribute UserRequest request,
                                               @RequestParam(defaultValue = "0") int pageNumber,
                                               @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<User> userList = userService.getUsers(request, pageable);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@CurrentUser User currentUser, @RequestPart("user") User user, @RequestPart("image") MultipartFile file) {
        User createdUser = userService.createUser(currentUser, user, file);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@CurrentUser User currentUser, @PathVariable Long userId, @RequestBody User user) {
        userService.updateUser(currentUser, userId, user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteUsers() {
        userService.deleteUsers();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
