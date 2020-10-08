package com.example.group.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Map;

@Entity
@Table(name = "project_scope")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"create_time", "update_time"},
		allowGetters = true)
public class ProjectScope {

	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;
    

	@Column(name="name")
	private String name;



	@Column(name = "cost_code")
	private int costCode;

	@Column(name = "project")
	private int projectCode;

//	@OneToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
//			CascadeType.PERSIST,CascadeType.REFRESH})
//	@JoinColumns(
//			{
//			@JoinColumn(name = "cost_code", insertable = false, updatable = false,referencedColumnName="resource_code"),
//			@JoinColumn(name = "project_code", insertable = false, updatable = false,referencedColumnName="project_code")
//			})
//	private ProjectResource projectResource;




  
   /* @Column(nullable = false, updatable = false, name="create_time")
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createTime;

    @Column(nullable = false, name="update_time")
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updateTime;*/


  public ProjectScope(){}
	public ProjectScope( String name, int costCode, int projectCode ) {
//		this.itemId = itemId;

		this.name = name;
		this.projectCode = projectCode;
		this.costCode = costCode;
	}

//	public ProjectScope( ProjectResource projectResource ) {
////		this.itemId = itemId;
//		this.projectResource = projectResource;
//
//	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


//	public ProjectResource getProjectResource() {
//		return projectResource;
//	}
//
//	public void setProjectResource(ProjectResource projectResource) {
//		this.projectResource = projectResource;
//	}


	public int getCostCode() {
		return costCode;
	}

	public void setCostCode(int costCode) {
		this.costCode = costCode;
	}

	public int getProjectCode() {
		return projectCode;
	}

	public void setProjectCode(int projectCode) {
		this.projectCode = projectCode;
	}

	/*public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}*/




	@ElementCollection(targetClass=ExtraColumn.class)
	@CollectionTable(name="extra_column" )
	@MapKeyColumn(name = "field")
	private Map<String, ExtraColumn> stringExtraColumnMap ;

	public Map<String, ExtraColumn> getStringExtraColumnMap() {

		return stringExtraColumnMap;

	}

	public void setStringExtraColumnMap(Map<String, ExtraColumn> stringExtraColumnMap) {

		this.stringExtraColumnMap = stringExtraColumnMap;

	}
}
