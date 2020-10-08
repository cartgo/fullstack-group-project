package com.example.group.dao;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DatabaseUpdates{

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void alterMyTableAddMyColumn(String tableName, String columnName,

                                        String columnType) {

        String query = "ALTER TABLE `" + tableName + "` ADD COLUMN `" + columnName + "` " +
                columnType;

        entityManager.createNativeQuery(query).executeUpdate();
    }

    @Transactional
    public void updateIntRecord(String tableName, int value,

                                        String columnName, int item_id) {

        String query = "UPDATE `" + tableName + "` SET " + columnName + "=" + value + " WHERE item_id=" + item_id;
              //  + "` " +
               // columnType;

        entityManager.createNativeQuery(query).executeUpdate();
    }

    @Transactional
    public void updateStringRecord(String tableName, String value,

                                String columnName, int item_id) {

        String query = "UPDATE `" + tableName + "` SET " + columnName + "= '" + value + "' WHERE item_id=" + item_id;
        //  + "` " +
        // columnType;

        entityManager.createNativeQuery(query).executeUpdate();
    }

    //select distinct column_name from information_schema.columns where table_name = 'project_scope';

    @Transactional
    public List<String> displayColumns(String tableName) {

        String query = "SELECT DISTINCT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name= '" + tableName +"'";

        return entityManager.createNativeQuery(query).getResultList();
    }

}
