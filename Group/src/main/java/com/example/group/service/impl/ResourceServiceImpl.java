package com.example.group.service.impl;

import com.example.group.dao.DatabaseUpdates;
import com.example.group.dao.ResourceRepository;
import com.example.group.model.Resource;
import com.example.group.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    @Override
    public void deleteAll() {
        resourceRepository.deleteAll();
    }


    @Override
    public Resource findByResourceName(String resourceName){
        return resourceRepository.findByResourceName(resourceName);
    }

    @Override
    public Resource findByResourceCode(int resource_code) {
        return resourceRepository.findByResourceCode(resource_code);

    }

   @Override
    public void deleteByResourceCode(int resourceCode){
        resourceRepository.deleteByResourceCode(resourceCode);
    }

    @Override
    public Resource saveResource(Resource resource) {
        return resourceRepository.save(resource);

    }

    @Override
    public Resource updateResource(Resource resource) {
        return resourceRepository.save(resource);
    }
    @Override
    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }

    @Autowired
    private DatabaseUpdates databaseUpdates;
    public void updateResource(String tableName, String columnName,
                        String columnType, String afterColumnName) {
        databaseUpdates.alterMyTableAddMyColumn(tableName,columnName,columnType);
    }
}
