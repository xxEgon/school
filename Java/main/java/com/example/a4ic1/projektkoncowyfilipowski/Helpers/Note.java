package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

/**
 * Created by 4ic1 on 2017-10-06.
 */
public class Note {

    private String title;
    private String text;
    private String color;
    private String path;
    private String id;

    public Note(String title, String text, String color, String path, String id) {
        this.title = title;
        this.text = text;
        this.color = color;
        this.path = path;
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
