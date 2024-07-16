package de.uni1.amos.filestorage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ContractAgreement {

    @Id
    private String id;

    private String fileName;

    private String fileSize;

    private String title;

    private String date;

    private String author;

    private String contenttype;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }

    public void setContenttype(String contenttype) {
        this.contenttype = contenttype;
    }

    public String getContenttype() {
        return contenttype;
    }

}
