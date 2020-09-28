package com.example.group.dao;

import com.example.group.model.Project;
import com.example.group.model.ProjectResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Project findByProjectName(String projectName);
    Project findByProjectCode(int projectCode);
   @Transactional
    void deleteByProjectCode(int projectCode);
//    List<ProjectResource> getProjectResource(int userId, int projectCode);
   List<Project> findByUserId(int userId);

}
