package de.uni1.amos.filestorage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UsedId {

    @Id
    private String id;

    public UsedId() {
    }

    public UsedId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
