package com.example.group.controller;

import com.example.group.model.Project;
import com.example.group.model.ProjectScope;
import com.example.group.service.ProjectScopeService;
import com.example.group.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projectScope")
public class ProjectScopeController {
    @Autowired
    private ProjectScopeService projectScopeService;

    @Autowired
    private ProjectService projectService;

    @GetMapping("/getAll")
    public List<ProjectScope> getAllProjectScope() {
        return projectScopeService.findAll();
    }

    @GetMapping("/getByItemId")
    public ProjectScope findByItemId(String itemId) {
        return projectScopeService.findByItemId(itemId);
    }



    @PostMapping("/add")
    public ProjectScope addProjectScope(@RequestParam("name") String name
            , @RequestParam("itemId") String itemId, @RequestParam("costCode") int costCode,
                                        @RequestParam("editable") boolean editable) {

        ProjectScope ps = new ProjectScope();
        ps.setItemId(itemId);
        ps.setName(name);
        ps.setEditable(editable);

        Project proj = projectService.findByProjectCode(costCode);
        ps.setCostCode(proj);
        return projectScopeService.saveProjectScope(ps);
    }

    @PutMapping("/updateName")
    public ProjectScope updateName(@RequestParam("itemId") String itemId
            , @RequestParam("name") String name) {

        ProjectScope ps = projectScopeService.findByItemId(itemId);
        ps.setName(name);

        return projectScopeService.saveProjectScope(ps);
    }

    /*@Transactional
    @DeleteMapping("/delete")
    public void deleteByItemId(String itemId){
        projectScopeService.deleteByItemId(itemId);
    }*/
}
