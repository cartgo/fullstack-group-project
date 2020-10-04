package com.example.group.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "project_scope")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"create_time", "update_time"},
        allowGetters = true)
public class ProjectScope {
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private String itemId;
    

    @Column(name="name")
    private String name;



	@OneToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
			CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumns(
			{
			@JoinColumn(name = "cost_code", insertable = false, updatable = false),
			@JoinColumn(name = "project_code", insertable = false, updatable = false)
			})
	private ProjectResource costCode;
    
    @Column
    private boolean editable;
  
   /* @Column(nullable = false, updatable = false, name="create_time")
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createTime;

    @Column(nullable = false, name="update_time")
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updateTime;*/

    public ProjectScope(){}


	public ProjectScope(String itemId, ProjectResource costCode, String name, boolean editable) {
		this.itemId = itemId;
		this.costCode = costCode;
		this.name = name;
		this.editable = editable;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public ProjectResource getCostCode() {
		return costCode;
	}

	public void setCostCode(ProjectResource costCode) {
		this.costCode = costCode;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	/*public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}*/

}
