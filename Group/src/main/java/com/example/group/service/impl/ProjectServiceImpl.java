package com.example.group.service.impl;

import com.example.group.dao.ProjectRepository;
import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import com.example.group.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project findByProjectName(String projectName){
        return projectRepository.findByProjectName(projectName);
    }
    @Override
    public List<Project>  findByUserId(int userId){
        return projectRepository.findByUserId(userId);
    }


    @Override
    public Project findByProjectCode(int projectCode){
        return projectRepository.findByProjectCode(projectCode);
    }

    @Override
    public void deleteByProjectCode(int projectCode){
        projectRepository.deleteByProjectCode(projectCode);
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);

    }

    @Override
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }
}
