package com.example.group.service;


import com.example.group.model.User;

import java.util.List;


public interface UserService {
    User findByUsername(String username);
    User findById(int id);
    User saveUser(User user);
    User updateUser(User user);
    List<User> findAll();
    void deleteById(int id);
    String findRoleByUserName(String user_name);
}
