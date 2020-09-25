package com.example.group.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "project",uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"project_name"
		})
})
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"create_time", "update_time"},
        allowGetters = true)
public class Project {
	
    @Id
	@Column(name ="project_code")
    private int projectCode;

    @NotBlank
    @Column(nullable = false, name="project_name",unique = true)
    private String projectName;

    /*@Column(nullable = false, updatable = false, name="create_time")
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createTime;

    @Column(nullable = false, name="update_time")
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updateTime;*/

	@JsonBackReference
    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
			 CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="user_id")
    private User user;

	@JsonBackReference
	@OneToMany(mappedBy="project",
			cascade= {CascadeType.PERSIST, CascadeType.MERGE,
					CascadeType.DETACH, CascadeType.REFRESH})
	private List<ProjectResource> projectResource;

	@JsonBackReference
	@OneToOne(mappedBy="costCode",cascade=CascadeType.ALL)
	private ProjectScope projectScope;

	public Project(){ }

	public Project(int projectCode, @NotBlank String projectName) {
		this.projectCode = projectCode;
		this.projectName = projectName;
	}

	public int getProjectCode() {
		return projectCode;
	}

	public void setProjectCode(int projectCode) {
		this.projectCode = projectCode;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	/*public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}*/

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<ProjectResource> getProjectResource() {
		return projectResource;
	}

	public void setProjectResource(List<ProjectResource> projectResource) {
		this.projectResource = projectResource;
	}

	public ProjectScope getProjectScope() {
		return projectScope;
	}

	public void setProjectScope(ProjectScope projectScope) {
		this.projectScope = projectScope;
	}

}
