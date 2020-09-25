package com.example.group.service.impl;

import com.example.group.model.User;
import com.example.group.dao.UserRepository;
import com.example.group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User findByUsername(String user_name){
        return userRepository.findByUsername(user_name);
    }

    public String findRoleByUserName(String user_name){
        User user = findByUsername(user_name);

        return user.getRole();
    }


    @Override
    public User findById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(int id){
        userRepository.deleteById(id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
