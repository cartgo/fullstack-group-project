package com.example.group.controller;

import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import com.example.group.model.Resource;
import com.example.group.model.User;
import com.example.group.service.ProjectService;
import com.example.group.service.ResourceService;
import com.example.group.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    @GetMapping("/getAll")
    public List<Project> getAllProjects() {
        return projectService.findAll();
    }

    @GetMapping("/getProjectByCode")
    public Project getProjectByCode(int projectCode) {
        return projectService.findByProjectCode(projectCode);
        //.orElseThrow(() -> new ResourceNotFoundException("resource", "id", code));
    }

    @GetMapping(value = "/getProjectByName")
    public Project findByProjectname(String projectName) {
        return projectService.findByProjectName(projectName);
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

    @PutMapping("/addResource")
    public Project addResource(@RequestParam("projectCode") int projectCode,
                               @RequestParam("resourceCode") int resourceCode) {

        Project project = projectService.findByProjectCode(projectCode);
        Resource resource = resourceService.findByResourceCode(resourceCode);
        if (resource != null && project != null){
            List list = project.getProjectResource();
            ProjectResource newProjRes = new ProjectResource(project, resource);
            list.add(newProjRes);
        }
        return projectService.updateProject(project);
    }

    @Transactional
    @DeleteMapping("/deleteProjectByCode")
    public ResponseEntity<?> deleteProjectByCode(int projectCode) {

        projectService.deleteByProjectCode(projectCode);

        return ResponseEntity.ok().build();
    }
}
