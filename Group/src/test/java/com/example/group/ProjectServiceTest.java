package com.example.group;



import com.example.group.dao.ProjectRepository;
import com.example.group.model.Project;
import com.example.group.model.User;
import com.example.group.service.impl.ProjectServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;


@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {
    @Mock
    private ProjectRepository projectRepository;
    @InjectMocks
    private ProjectServiceImpl projectService;
    @Test
    void findByProjectName(){
        final String name = "Project 1";
        final Project proj = new Project(101,"Project 1");
        given(projectRepository.findByProjectName(name)).willReturn(proj);
        final Project expected  =projectService.findByProjectName(name);
        assertThat(expected).isNotNull();
    }

    @Test
    void findByProjectCode(){
        final int code = 101;
        final Project proj = new Project(101,"Project 1");
        given(projectRepository.findByProjectCode(code)).willReturn(proj);
        final Project expected  =projectService.findByProjectCode(code);
        assertThat(expected).isNotNull();
    }
}
