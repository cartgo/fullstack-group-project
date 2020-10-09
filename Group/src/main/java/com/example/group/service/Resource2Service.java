package com.example.group.service;

import com.example.group.model.Resource2;

import java.util.List;

public interface Resource2Service {
    Resource2 findByResource2Code (int resource2Code);
    Resource2 save(Resource2 resource2);
    List<Resource2> findAll();
}
