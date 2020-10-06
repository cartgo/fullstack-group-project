package com.example.group.controller;

import com.example.group.dao.DatabaseUpdates;
import com.example.group.dao.ProjectResourceRepository;
import com.example.group.dao.ProjectScopeRepository;
import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import com.example.group.model.ProjectScope;
import com.example.group.model.Resource;
import com.example.group.service.ProjectScopeService;
import com.example.group.service.ProjectService;
import com.example.group.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ProjectScope findByItemId(int itemId) {
        return projectScopeService.findByItemId(itemId);
    }

//    @GetMapping("/findByProjectCode")
//    public List<ProjectScope> getByProjectCode(@RequestParam("projectCode") int projectCode) {
//        List<ProjectScope> list = projectScopeService.findAll();
//         List<ProjectScope> tlist = new ArrayList<>();
//
//        for(ProjectScope ps: list){
//            if (ps.getProjectCode() == projectCode){
//                tlist.add(ps);
//            }
//        }
//        return tlist;
//    }


    @Autowired
    ProjectResourceRepository projectResourceRepository;
    @Autowired
    ProjectScopeRepository projectScopeRepository;
    @Autowired
    ResourceService resourceService;
//    @GetMapping("/findByProjectResource")
//    public ProjectScope getByProjectResource(
//            @RequestParam("projectCode") int projectCode,
//            @RequestParam("resourceCode") int resourceCode) {
//        return projectScopeRepository.findByProjectResource(
//                projectResourceRepository.findProjectResourceByProjectAndResource(
//                projectService.findByProjectCode(projectCode),
//                        resourceService.findByResourceCode(resourceCode)
//                )
//        );
//
//    }

    @PostMapping("/add")
    public ProjectScope addProjectScope(
            @RequestParam("projectCode") int projectCode,
            @RequestParam("resourceCode") int resourceCode
//            @RequestParam("projectCode") int projectCode
            ) {
                ProjectScope ps = new ProjectScope(
                        resourceService.findByResourceCode(resourceCode).getResourceName(),
                        resourceCode,
                        projectCode
                        );
                return projectScopeService.saveProjectScope(ps);
      }


    @GetMapping("/findByProjectCode")
    public List<ProjectScope> findByProjectCode(
            @RequestParam("projectCode") int projectCode) {

        Boolean has = false;
        List<ProjectScope> list = new ArrayList<>();
        for(ProjectScope pr: projectScopeService.findAll()){
            if (pr.getProjectCode() == projectCode){
                has = true;
                list.add(pr);
            }
        }
        if(has == false){
            for(ProjectResource pr:projectService.findByProjectCode(projectCode).getProjectResource()){
                    ProjectScope nps = new ProjectScope(pr.getResource().getResourceName(),
                            pr.getResource().getResourceCode(),
                            projectCode);
                projectScopeService.saveProjectScope(nps);
                list.add(projectScopeService.saveProjectScope(nps));
            }
        }
        return list;
    }


    @PutMapping("/updateCostCode")
    public ProjectScope updateCostCode(@RequestParam("itemId") int itemId
            , @RequestParam("costCode") int costCode) {

        ProjectScope ps = projectScopeService.findByItemId(itemId);
        ps.setCostCode(costCode);

        return projectScopeService.saveProjectScope(ps);
    }




    @PutMapping("/updateName")
    public ProjectScope updateName(@RequestParam("itemId") int itemId
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
