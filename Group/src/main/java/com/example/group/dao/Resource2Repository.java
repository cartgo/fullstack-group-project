package com.example.group.dao;

import com.example.group.model.Resource;
import com.example.group.model.Resource2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Resource2Repository extends JpaRepository<Resource2, Integer> {
    Resource2 findByResource2Code (int resource2Code);
    Resource2 save(Resource2 resource2);
}
