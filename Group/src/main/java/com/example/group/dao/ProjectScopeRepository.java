package com.example.group.dao;
import com.example.group.model.ProjectScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ProjectScopeRepository extends  JpaRepository<ProjectScope,Integer> {
    ProjectScope findByItemId(String itemId);
    ProjectScope save(ProjectScope projectScope);
    /*@Transactional
    void deleteByItemId(String itemId);*/



}

