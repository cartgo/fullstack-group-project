package com.example.group.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Map;

@Entity
@Table(name = "resource2")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"create_time", "update_time"},
        allowGetters = true)
public class Resource2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;


    @Column(name="resource2_code")
    private int resource2Code;


    public Resource2() {
    }

    public Resource2(int itemId, int resource2Code, int resource2Name, Map<String, ExtraColumn> stringExtraColumnMap) {
        this.itemId = itemId;
        this.resource2Code = resource2Code;
        this.resource2Name = resource2Name;
        this.stringExtraColumnMap = stringExtraColumnMap;
    }

    @Column(name = "resource2_name")
    private int resource2Name;

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getResource2Code() {
        return resource2Code;
    }

    public void setResource2Code(int resource2Code) {
        this.resource2Code = resource2Code;
    }

    public int getResource2Name() {
        return resource2Name;
    }

    public void setResource2Name(int resource2Name) {
        this.resource2Name = resource2Name;
    }

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
