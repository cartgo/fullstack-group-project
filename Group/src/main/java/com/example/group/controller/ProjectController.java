package com.example.group.controller;

import com.example.group.dao.ProjectResourceRepository;
import com.example.group.model.*;
import com.example.group.service.ProjectService;
import com.example.group.service.ResourceService;
import com.example.group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/project")
public class ProjectController {


    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;
    @Autowired
    private ProjectResourceRepository prservice;

//    @GetMapping("/getAll")
//    public List<Project> getAllProjects() {
//        return projectService.findAll();
//    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllProjects() {
        return new ResponseEntity<>(projectService.findAll(), HttpStatus.OK);
//        return projectService.findAll();
    }

    //ResponseEntity<?>
    // return new ResponseEntity<>(projectService.findByProjectCode(projectCode), HttpStatus.OK);
    @GetMapping("/getProjectByCode")
    public Project getProjectByCode(int projectCode) {
        return projectService.findByProjectCode(projectCode);
        //.orElseThrow(() -> new ResourceNotFoundException("resource", "id", code));
    }



    @GetMapping(value = "/getProjectByName")
    public Project findByProjectname(String projectName) {
        return projectService.findByProjectName(projectName);
    }

    //    @GetMapping("/getByUserId")
//    public List<Project> getByUserId(@RequestParam("userId") int userId)
//    {
//        return projectService.findByUserId(userId);
//    }
    @GetMapping("/getByUserId")
    public ResponseEntity<?> getByUserId(@RequestParam("userId") int userId)
    {
        return new ResponseEntity<>(projectService.findByUserId(userId), HttpStatus.OK);

    }

    @PostMapping("/add")
    public Project addProject(@RequestParam("projectCode") int projectCode
            , @RequestParam("projectName") String projectName, @RequestParam("userId") int userId) {

        Project proj = new Project();
        proj.setProjectCode(projectCode);
        proj.setProjectName(projectName);
        User user = userService.findById(userId);
        proj.setUser(user);
        return projectService.saveProject(proj);
    }



    @PutMapping("/updateProjectByCode")
    public Project updateProjectByCode(int projectCode, String projectName, int userId) {
        Project proj = projectService.findByProjectCode(projectCode);
        proj.setProjectName(projectName);
        User user = userService.findById(userId);
        proj.setUser(user);
        return projectService.updateProject(proj);
    }



    @Transactional
    @DeleteMapping("/deleteProjectByCode")
    public ResponseEntity<?> deleteProjectByCode(int projectCode) {

        projectService.deleteByProjectCode(projectCode);

        return ResponseEntity.ok().build();
    }




    @PutMapping("/addResource")
    public Project addResource(@RequestParam("userId") int userId,
                               @RequestParam("projectCode") int projectCode,
                               @RequestParam("resourceCode") int resourceCode) {
        List<Project> usersproject = projectService.findByUserId(userId); //find all projects of this user
        Project project = new Project();
        for(Project p: usersproject){
            if( p.getProjectCode() == projectCode){project = p;}
        }  ;//this user's this project, to add resource in.
        Resource resource = resourceService.findByResourceCode(resourceCode);//resource to be added

//        Project project = projectService.findByProjectCode(projectCode);
        if (resource != null && project != null){
            List list = project.getProjectResource();
            ProjectResource newProjRes = new ProjectResource(project, resource);
            list.add(newProjRes);
        }
        return projectService.updateProject(project);
    }

    @Transactional
    @DeleteMapping("/deleteResource")//ResponseEntity<?>
    public ResponseEntity<?> deleteResource (
            @RequestParam("projectCode") int projectCode,
            @RequestParam("resourceCode") int resourceCode){
        Resource resource = resourceService.findByResourceCode(resourceCode);
        Project project = projectService.findByProjectCode(projectCode);
        prservice.deleteProjectResourceByProjectAndResource(project,resource);
        return ResponseEntity.ok().build();

    }

    @Transactional
    @DeleteMapping("/deleteAllProjectResource")//ResponseEntity<?>
    public ResponseEntity<?> deleteAllProjectResource (
            @RequestParam("projectCode") int projectCode
    ){
//        Resource resource = resourceService.findByResourceCode(resourceCode);
        Project project = projectService.findByProjectCode(projectCode);
        prservice.deleteAllByProject(project);
        return ResponseEntity.ok().build();

    }

    @PutMapping("/setResource")
    public Project setResource(
            @RequestParam("projectCode") int projectCode,
            @RequestParam("resourceCodeList") List<String> resourceCodeList) {
        //find all projects of this user
        Project project = projectService.findByProjectCode(projectCode);
        List<ProjectResource> listpr = new ArrayList<>();
        for(String i: resourceCodeList){
            ProjectResource pr = new ProjectResource(
                    this.projectService.findByProjectCode(projectCode),
                    this.resourceService.findByResourceCode(Integer.parseInt(i))
            );
            listpr.add(pr);
        }
        project.setProjectResource(listpr);

        return projectService.updateProject(project);
    }


    @GetMapping("/getProjectResource")
    public List<Resource> getProjectResource(int userId, int projectCode) {

        List<Resource> list = new ArrayList();
        for(ProjectResource pr:projectService.findByProjectCode(projectCode).getProjectResource()){
            list.add(pr.getResource());
        }
        return list;
    }

    @GetMapping("/getProjectScope")
    public List<ProjectScope> projectScopes(
            @RequestParam("projectCode") int projectCode
    ){
        Project project=projectService.findByProjectCode(projectCode);
        List<ProjectResource> prs = project.getProjectResource();
        List<ProjectScope> projectScopeList = new ArrayList();
        for(ProjectResource pr:prs){
            projectScopeList.add(pr.getProjectScope());
        }
        return projectScopeList;
    }

}
