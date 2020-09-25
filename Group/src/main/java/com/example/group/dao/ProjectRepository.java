package com.example.group.dao;

import com.example.group.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Project findByProjectName(String projectName);
    Project findByProjectCode(int projectCode);
   @Transactional
    void deleteByProjectCode(int projectCode);
}
