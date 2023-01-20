package com.vidmantas.saulius.examtask.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String commentName;
    private String commentDescription;


    @ManyToOne
    @JoinColumn(name = "parent_entity_id")
    private ArticleEntity articleEntity;

    public Comment() {
    }

    public Comment(String commentName, String commentDescription) {
        this.commentName = commentName;
        this.commentDescription = commentDescription;
    }

    public Long getId() {
        return id;
    }

    public String getCommentName() {
        return commentName;
    }

    public String getCommentDescription() {
        return commentDescription;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCommentName(String commentName) {
        this.commentName = commentName;
    }

    public void setCommentDescription(String commentDescription) {
        this.commentDescription = commentDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id) && Objects.equals(commentName, comment.commentName) && Objects.equals(commentDescription, comment.commentDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, commentName, commentDescription);
    }
}
