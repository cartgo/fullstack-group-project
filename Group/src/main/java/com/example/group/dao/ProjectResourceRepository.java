package com.example.group.dao;

import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import com.example.group.model.ProjectScope;
import com.example.group.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface ProjectResourceRepository  extends JpaRepository<ProjectResource,Integer> {
    @Transactional
    void deleteProjectResourceByProjectAndResource(Project project , Resource resource);
    void deleteAllByProject(Project project);

    ProjectResource findProjectResourceByProjectAndResource(Project project , Resource resource);
}
