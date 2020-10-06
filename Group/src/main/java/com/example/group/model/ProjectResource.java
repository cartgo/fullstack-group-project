package com.example.group.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "project_resource")
@IdClass(connPk.class)
public class ProjectResource {

    @Id
    @ManyToOne(
//            cascade = CascadeType.DETACH
    )
    @JoinColumn(name = "project_code")
    private Project project;

    @JsonBackReference
    @OneToOne(mappedBy="costCode",cascade=CascadeType.ALL)
    private ProjectScope projectScope;

    public ProjectResource(){}

    public ProjectResource(Project project, Resource resource) {
        this.project = project;
        this.resource = resource;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;

    }

    @Id
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "resource_code")
    private Resource resource;

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }
    public ProjectScope getProjectScope() {
        return projectScope;
    }

    public void setProjectScope(ProjectScope projectScope) {
        this.projectScope = projectScope;
    }


}

class connPk implements Serializable {
    private Project project;

    public Project getProject() {
        return project;
    }

    private Resource resource;

    public Resource getResource() {
        return resource;
    }
}

