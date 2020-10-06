package com.example.group.controller;

import com.example.group.dao.DatabaseUpdates;
import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import com.example.group.model.ProjectScope;
import com.example.group.service.ProjectScopeService;
import com.example.group.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
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
    public ProjectScope addProjectScope(
            @RequestParam("projectCode") int projectCode,
//            @RequestParam("name") String name,
            @RequestParam("costCode") int costCode,
            @RequestParam("editable") boolean editable) {

        ProjectScope ps = new ProjectScope();
//        ProjectService.get
//        ps.setItemId(itemId);
//        ps.setName(name);
        ps.setEditable(editable);
        Project proj = projectService.findByProjectCode(projectCode);
        List<ProjectResource> prlist  = proj.getProjectResource();
        ProjectResource newpr= new ProjectResource();
        for(ProjectResource pr:prlist){
            if (pr.getResource().getResourceCode() == costCode){
                newpr = pr; ps.setName(pr.getResource().getResourceName());break;

            }
        }

        ps.setCostCode(newpr);
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

    @Autowired
    private DatabaseUpdates databaseUpdates;

    @PutMapping("/addcolumn")
    private void addcolumn(
            @RequestParam("columnName") String columnName,
            @RequestParam("columnType") String columnType,
            @RequestParam("afterColumnName") String afterColumnName

            ) {
        // some logic that checks it the update needs to happen is here
        String tableName = "project_scope";
//        String columnName = "my_column";
//        String columnType = "VARCHAR(100)";
//        String afterColumnName = "after_column";//this is after which column you want to add new column --mingyan

        databaseUpdates.alterMyTableAddMyColumn(tableName, columnName,
                columnType, afterColumnName);
    }



}
