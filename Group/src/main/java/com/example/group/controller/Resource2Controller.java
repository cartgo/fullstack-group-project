package com.example.group.controller;


import com.example.group.model.ProjectScope;
import com.example.group.model.Resource2;
import com.example.group.service.Resource2Service;
import com.example.group.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/resource2")
public class Resource2Controller {
    @Autowired
    ResourceService resourceService;

//    @Autowired
//    Resource2Service resource2Service;
//
//    @GetMapping("/getAll")
//    public List<Resource2> getAllProjectScope() {
//        return resource2Service.findAll();
//    }
}
