package com.example.group.service;

import com.example.group.model.ProjectScope;

import java.util.List;


public interface ProjectScopeService {

    ProjectScope findByItemId(int itemId);
    ProjectScope saveProjectScope(ProjectScope projectScope);
    List<ProjectScope> findAll();
    //void deleteByItemId(String itemId);
}



