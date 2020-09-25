package com.example.group.service;


import com.example.group.model.Project;

import java.util.List;

public interface ProjectService {
    Project findByProjectName(String ProjectNam);
    Project findByProjectCode(int ProjectCode);
    Project saveProject(Project project);
    Project updateProject(Project project);
    List<Project> findAll();
    void deleteByProjectCode(int projectCode);
}
