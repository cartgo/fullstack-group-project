package com.example.group;



import com.example.group.dao.ProjectRepository;
import com.example.group.dao.ResourceRepository;
import com.example.group.model.Project;
import com.example.group.model.Resource;
import com.example.group.model.User;
import com.example.group.service.impl.ProjectServiceImpl;
import com.example.group.service.impl.ResourceServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;


@ExtendWith(MockitoExtension.class)
class ResourceServiceTest {

    @Mock
    private ResourceRepository resourceRepository;

    @InjectMocks
    private ResourceServiceImpl resourceService;

    @Test
    void findByResourceName(){
        final String name = "Resource 1";
        final Resource res = new Resource(1001,"Resource 1");
        given(resourceRepository.findByResourceName(name)).willReturn(res);

        final Resource expected  =resourceService.findByResourceName(name);

        assertThat(expected).isNotNull();
    }

    @Test
    void findByResourceCode(){
        final int code = 1001;
        final Resource res = new Resource(1001,"Resource 1");
        given(resourceRepository.findByResourceCode(code)).willReturn(res);

        final Resource expected  =resourceService.findByResourceCode(code);

        assertThat(expected).isNotNull();
    }
}
