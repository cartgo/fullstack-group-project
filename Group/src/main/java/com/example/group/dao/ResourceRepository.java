package com.example.group.dao;

import com.example.group.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {

    Resource findByResourceName(String resource_name);
    Resource findByResourceCode(int resourceCode);
   @Transactional
    void deleteByResourceCode(int resourceCode);
//   List<Resource> findByProjectResource

    @Transactional
    void deleteAll();
}
