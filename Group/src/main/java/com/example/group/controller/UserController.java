package com.example.group.controller;

import com.example.group.model.User;
import com.example.group.dao.UserRepository;
import com.example.group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user")
    public String getUsers() {
        return "Role user";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String getAdmin() {
        return "Role admin";
    }
    @GetMapping("/all")
    public String getAll() {
        return "Public";
    }

    @PostMapping("/add")
    public User createUser(User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/getById/{id}")
    public User getUserDetailById(@PathVariable(value = "id") int userId) {
        return userService.findById(userId);
        //.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    @GetMapping(value = "/findByUserName")
    public User findByUserName(String username) {
        return userService.findByUsername(username);
    }

    @PutMapping("/updatePasswordById")
    public User updatePasswordById(int id, String password) {
        User user = userService.findById(id);
        user.setPassword(password);
        return userService.updateUser(user);
    }

    @PutMapping("/updateUserById/{id}")
    public User updateUserById(@PathVariable(value = "id") int userId,
                               User userDetails) {

        User user = userService.findById(userId);
        //.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());

        User updatedUser = userService.saveUser(user);
        return updatedUser;
    }

    @Transactional
    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable(value = "id") int userId) {
        //UserDetail user = userDetailService.findByUserId(userId)
        //.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        userService.deleteById(userId);

        return ResponseEntity.ok().build();
    }

}
