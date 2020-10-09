package com.example.group.service.impl;

import com.example.group.dao.Resource2Repository;
import com.example.group.model.Resource2;
import com.example.group.service.Resource2Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class Resource2ServiceImpl implements Resource2Service {
    @Autowired
    private Resource2Repository resource2Repository;

    @Override
    public Resource2 findByResource2Code (int resource2Code) {
        return resource2Repository.findByResource2Code(resource2Code);
    }

    @Override
    public Resource2 save(Resource2 resource2) {
        return resource2Repository.save(resource2);
    }

    @Override
    public List<Resource2> findAll() {
        return resource2Repository.findAll();
    }
}
