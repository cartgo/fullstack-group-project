package com.example.group.service;

import com.example.group.model.Resource;

import java.util.List;

public interface ResourceService {

    Resource findByResourceName(String resourceName);
    Resource findByResourceCode(int resourceCode);
    Resource saveResource(Resource resource);
    Resource updateResource(Resource resource);
    List<Resource> findAll();
    void deleteByResourceCode(int resourceCode);
    void deleteAll();
    void updateResource(String tableName, String columnName,
                        String columnType, String afterColumnName);
}
