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

                                        String columnType) {

        String query = "ALTER TABLE `" + tableName + "` ADD COLUMN `" + columnName + "` " +
                columnType;

        entityManager.createNativeQuery(query).executeUpdate();
    }

    @Transactional
    public void alterResourceAddMyColumn(String tableName, String columnName

                                        ) {

        String query = "ALTER TABLE `" + tableName + "` ADD COLUMN `" + columnName + "` " +
                "varchar(100)";

        entityManager.createNativeQuery(query).executeUpdate();
    }
}
