package com.example.group.dao;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
public class DatabaseUpdates{

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void alterMyTableAddMyColumn(String tableName, String columnName,
                                        String columnType, String afterColumnName) {

        String query = "ALTER TABLE `" + tableName + "` ADD COLUMN `" + columnName + "` " +
                columnType + " AFTER `" + afterColumnName + "`";

        entityManager.createNativeQuery(query).executeUpdate();
    }
}
