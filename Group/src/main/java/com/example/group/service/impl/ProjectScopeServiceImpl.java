package com.example.group.service.impl;


import com.example.group.dao.ProjectScopeRepository;
import com.example.group.model.ProjectScope;
import com.example.group.service.ProjectScopeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectScopeServiceImpl implements ProjectScopeService {
    @Autowired
    private ProjectScopeRepository projectScopeRepository;

    @Override
    public ProjectScope findByItemId(int itemId) {
        return projectScopeRepository.findByItemId(itemId);
    }

    @Override
    public  ProjectScope saveProjectScope(ProjectScope projectScope){
        return projectScopeRepository.save(projectScope);

    }

    @Override
    public List<ProjectScope> findAll() {
        return projectScopeRepository.findAll();
    }

   /* @Override
   public void deleteByItemId(String itemId){
        projectScopeRepository.deleteByItemId(itemId);
    }*/

}
