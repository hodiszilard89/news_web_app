package com.example.hirportal01.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "text")
    private String text;

    private Date releaseDate;
    @ManyToMany(mappedBy = "likes")
    @JsonBackReference
    private List<Users> likes;

    @ManyToMany
    @JoinTable(name = "news_type",
            joinColumns = @JoinColumn(name = "news_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id"))
    @JsonBackReference
    private Set<TypeOfNews> type;

    @OneToMany(mappedBy = "news")
    @JsonBackReference
    private List<Comment> comments;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "users_id")
    private Users   writer;
    @Column(columnDefinition = "text")
    private String imgPath;
    private String title;
    public News() {
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Set<TypeOfNews> getType() {
        return type;
    }

    public void setType(Set<TypeOfNews> type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Users getWriter() {
        return writer;
    }

    public void setWriter(Users writer) {
        this.writer = writer;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Users> getLikes() {
        return likes;
    }

    public void setLikes(List<Users> likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }


}
