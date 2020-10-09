package com.example.group.controller;

import com.example.group.dao.DatabaseUpdates;
import com.example.group.dao.ProjectResourceRepository;
import com.example.group.dao.ProjectScopeRepository;
import com.example.group.model.*;
import com.example.group.service.ProjectScopeService;
import com.example.group.service.ProjectService;
import com.example.group.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                        projectCode,"false"
                        );
                return projectScopeService.saveProjectScope(ps);
      }


    @GetMapping("/findByProjectCode")
    public List<ProjectScope> findByProjectCode(
            @RequestParam("projectCode") int projectCode) {

        Boolean has = false;
        List<ProjectScope> list = new ArrayList<>();
        for(ProjectScope pr: projectScopeService.findAll()){
            for(ProjectResource prr: projectService.findByProjectCode(projectCode).getProjectResource()){
                for(ProjectScope ps: projectScopeService.findAll()){
                    if (prr.getResource().getResourceName() == ps.getName()){has = true;break;}
                }
                if(has == false){

                }
            }



            if (pr.getProjectCode() == projectCode){
                has = true;
                list.add(pr);
            }
        }
        if(has == false){
            for(ProjectResource pr:projectService.findByProjectCode(projectCode).getProjectResource()){
                    ProjectScope nps = new ProjectScope(pr.getResource().getResourceName(),
                            pr.getResource().getResourceCode(),
                            projectCode,"false");
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


    @PutMapping("/update")
    public ProjectScope update(@RequestBody ProjectScope projectScope
                                   ) {
        Integer itemId = projectScope.getItemId();

        ProjectScope ps = projectScopeService.findByItemId(itemId);
        ps.setStringExtraColumnMap(projectScope.getStringExtraColumnMap());
        ps.setCostCode(projectScope.getCostCode());

        return projectScopeService.saveProjectScope(ps);
    }
//
//    {
//        "itemId": 6,
//            "name": "rssss44",
//            "costCode": 11,
//            "projectCode": 2,
//            "stringExtraColumnMap": {
//        "3ststring": {
//            "itemId": 0,
//                    "extraNum": 0,
//                    "extraString": "",
//                    "extraFormula": null
//        },
//        "4thstring": {
//            "itemId": 0,
//                    "extraNum": 0,
//                    "extraString": "default",
//                    "extraFormula": null
//        },
//        "2ststring": {
//            "itemId": 0,
//                    "extraNum": 0,
//                    "extraString": "",
//                    "extraFormula": null
//        },
//        "1ststring": {
//            "itemId": 0,
//                    "extraNum": 0,
//                    "extraString": "",
//                    "extraFormula": null
//        }
//    }
//
//
    @PutMapping("/updateName")
    public ProjectScope updateName(@RequestParam("itemId") int itemId
            , @RequestParam("name") String name) {

        ProjectScope ps = projectScopeService.findByItemId(itemId);
        ps.setName(name);

        return projectScopeService.saveProjectScope(ps);
    }

    //////////////////////////////////////////////below to delete////////////////////////////////////////////////////////////////////////

    @Autowired
    private DatabaseUpdates databaseUpdates;
    @PutMapping("/addcolumn")
    private void addcolumn(
            @RequestParam("columnName") String columnName,
            @RequestParam("columnType") String columnType
            //@RequestParam("afterColumnName") String afterColumnName

    ) {

        // some logic that checks it the update needs to happen is here
        String tableName = "project_scope";
//        String columnName = "my_column";
//        String columnType = "VARCHAR(100)";
//        String afterColumnName = "after_column";//this is after which column you want to add new column --mingyan

        databaseUpdates.alterMyTableAddMyColumn(tableName, columnName,
                 columnType);
    }
/*
    @PutMapping("/updateIntRecord")
    private void updateIntRecord(
            @RequestParam("value") int value,
            @RequestParam("columnName") String columnName,
            @RequestParam("item_id") int item_id) {
        String tableName = "project_scope";
        databaseUpdates.updateIntRecord(tableName,value,columnName,item_id);
    }
    @PutMapping("/updateStringRecord")
    private void updateStringRecord(
            @RequestParam("value") String value,
            @RequestParam("columnName") String columnName,
            @RequestParam("item_id") int item_id) {
        String tableName = "project_scope";
        databaseUpdates.updateStringRecord(tableName,value,columnName,item_id);
    }
*/
/////////////////////////////////////////////above to delete/////////////////////////////////////////////////////////////////////////////



    @PutMapping("addco")   //in project with projectCode "projectCode", add a column with column name "name", type is "type".
    private void addco(
            @RequestParam("type") String type,
            @RequestParam("name") String name,
            @RequestParam("formula") String formula,
            @RequestParam("projectCode") int projectCode
    ){
        boolean has = false;
        List<ProjectScope> list = new ArrayList<>();
        for(ProjectScope pr: projectScopeService.findAll()){
            if (pr.getProjectCode() == projectCode){
                has = true;
                list.add(pr);
            }
        }
        if(!has){
            for(ProjectResource pr:projectService.findByProjectCode(projectCode).getProjectResource()){
                ProjectScope nps = new ProjectScope(pr.getResource().getResourceName(),
                        pr.getResource().getResourceCode(),
                        projectCode,"false");
                projectScopeService.saveProjectScope(nps);
                list.add(projectScopeService.saveProjectScope(nps));
            }
        }

        if(type.equals("Text")){
             for(ProjectScope ps: list){
                ExtraColumn extraColumn = new ExtraColumn();
                extraColumn.setExtraString("input text");
                extraColumn.setType("Text");
                Map<String, ExtraColumn> stringmap = ps.getStringExtraColumnMap();
                stringmap.put(name, extraColumn);
                 ps.setStringExtraColumnMap(stringmap);
                 projectScopeService.saveProjectScope(ps);
            }

        }else if(type.equals("Number")){
            for(ProjectScope ps: list){
                ExtraColumn extraColumn = new ExtraColumn();
//                extraColumn.setExtraNum(new Integer(233));
                extraColumn.setType("Number");
                Map<String, ExtraColumn> stringmap = ps.getStringExtraColumnMap();
                stringmap.put(name, extraColumn);
                ps.setStringExtraColumnMap(stringmap);
                projectScopeService.saveProjectScope(ps);
            }
        }else{
            for(ProjectScope ps: list){
                ExtraColumn extraColumn = new ExtraColumn();
                extraColumn.setExtraFormula(formula);
                extraColumn.setType("Formula");
                Map<String, ExtraColumn> stringmap = ps.getStringExtraColumnMap();
                stringmap.put(name, extraColumn);
                ps.setStringExtraColumnMap(stringmap);
                projectScopeService.saveProjectScope(ps);
        }
    }


}}
