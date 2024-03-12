package com.example.hirportal01.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.*;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "text")
    private String text;

    private Date releasedate;


    //próba
//    @ManyToMany(mappedBy = "likedNews")
//    @JsonBackReference (value="newsLikes")
//    private Set<Users> likes = new HashSet<>();
//

    @ManyToMany
    @JoinTable(name = "user_news_likes",
            joinColumns = @JoinColumn(name = "news_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id"))
    @JsonBackReference (value="newsLikes")
    private Set<Users> likes = new HashSet<>();

    public Set<Users> getLikes() {
        return likes;
    }

    public void setLikes(Set<Users> likes) {
        this.likes = likes;
    }

    //eredeti


    @ManyToMany
    @JoinTable(name = "news_type",
            joinColumns = @JoinColumn(name = "news_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id"))
    @JsonBackReference(value="newsTypes")
    private Set<TypeOfNews> types;

    //@OneToMany(mappedBy = "news")
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "newsComments")
    private List<Comment> comments;

    private Boolean priority;

    public Boolean getPriority() {
        return priority;
    }

    public void setPriority(Boolean priority) {
        this.priority = priority;
    }

    @ManyToOne
    @JsonBackReference(value= "newsWriter")
    @JoinColumn(name = "users_id")
    private Users   writer;
    @Column(columnDefinition = "text")
    private String imgPath;

    private String subtitle;
    private String title;
    public News() {
    }

    public Date getReleasedate() {
        return releasedate;
    }

    public void setReleasedate(Date releasedate) {
        this.releasedate = releasedate;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public Set<TypeOfNews> getTypes() {
        return types;
    }

    public void setTypes(Set<TypeOfNews> types) {
        this.types = types;
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

//    public Set<Users> getLikes() {
//        return likes;
//    }
//    public void setLikes(Set<Users> likes) {
//        this.likes = likes;
//    }
    public void addLikedUser(Users user){ this.likes.add(user);
    }

    public void removeFromLikedUsers(Users user){
        this.likes.remove(user);
    }
    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        News otherObject = (News) obj;
        return Objects.equals(otherObject.getId(),getId());
    }
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


}
