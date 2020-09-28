package com.example.group.controller;

import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import com.example.group.model.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/test")
public class testController {
    private Project p1 = new Project(1,"a");
    private Project p2 = new Project(2,"b");
    private Project p3 = new Project(3,"c");
//    private List<Project> p = new ArrayList<>(3);
    @GetMapping("")
    public List<Project> showtest(){
        List<Project> p = new ArrayList<>(3);
        p.add(p1);
        p.add(p2);
        p.add(p3);
        return p;
    }
    @PutMapping("/add")
    public List<ProjectResource> addresourcetest(Resource r){
        p1.getProjectResource().add(new ProjectResource(p1, r));
        return p1.getProjectResource();
    }



}
