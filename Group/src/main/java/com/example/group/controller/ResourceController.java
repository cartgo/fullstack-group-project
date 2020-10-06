package com.example.group.controller;


import com.example.group.dao.DatabaseUpdates;
import com.example.group.model.Resource;
import com.example.group.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin 
@RequestMapping("/resource")
public class ResourceController {


    @Autowired
    private ResourceService resourceService;

    @GetMapping("/getAll")
    public List<Resource> getAllResources() {
        return resourceService.findAll();
    }

    @PostMapping("/add")
    public Resource createResource(Resource resource) {
        return resourceService.saveResource(resource);
    }

    @GetMapping("/getResourceByCode")
    public Resource getResourceByCode(int resourceCode) {
        return resourceService.findByResourceCode(resourceCode);
        //.orElseThrow(() -> new ResourceNotFoundException("resource", "id", code));
    }

    @GetMapping(value = "/getResourceByName")
    public Resource findByResourcename(String resourceName) {
        return resourceService.findByResourceName(resourceName);
    }

    @PutMapping("/updateResourceByCode")
    public Resource updateResourceByCode(int code, String name) {
        Resource res = resourceService.findByResourceCode(code);
        res.setResourceName(name);
        return resourceService.updateResource(res);
    }

    @Transactional
    @DeleteMapping("/deleteResource/{resource_code}")
    public ResponseEntity<?> deleteResource(@PathVariable(value = "resource_code") int code) {

        resourceService.deleteByResourceCode(code);

        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping(value =  "/deleteByResourceCode")
    public void deleteByResource_code(int resource_code){
        resourceService.deleteByResourceCode(resource_code);
    }


    @Transactional
    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        resourceService.deleteAll();
    }
//    @Autowired
//    private DatabaseUpdates databaseUpdates;
//    @PutMapping("/addcolumn")
//    private void addcolumn(
//            @RequestParam("columnName") String columnName,
//            @RequestParam("columnType") String columnType,
//            @RequestParam("afterColumnName") String afterColumnName
//
//    ) {
//        String tableName = "resource";
////        String columnType = "VARCHAR(100)";
////        String afterColumnName = "resource_name"; //this is after which column you want to add new column --mingyan
//
//        databaseUpdates.alterMyTableAddMyColumn(tableName, columnName,
//                columnType, afterColumnName);
//    }

//    @Autowired
//    private DatabaseUpdates databaseUpdates;
    @PostMapping("/addcolumn")
    private void addcolumn(

    ) {
        String tableName = "resource";
//        String columnType = "VARCHAR(100)";
//        String afterColumnName = "resource_name"; //this is after which column you want to add new column --mingyan

        resourceService.updateResource("resource", "newColumn",
                "varchar(100)", "resource_name");
    }
}
