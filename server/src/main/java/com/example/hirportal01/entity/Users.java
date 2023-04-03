package com.example.hirportal01.entity;
import javax.persistence.*;
import java.util.List;

@Entity
public class Users {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long  Id;

    @ManyToMany
    @JoinTable(name = "user_laws",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "law_id"))
    private List<Law> laws;

    @OneToMany(mappedBy = "writer")
    private List<News> news;

    @ManyToMany
    @JoinTable(name = "user_news_likes",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "news_id"))
    private List<News> likes;

    private String chatName;

    private String firstName;

    private String secName;

    public Users() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public List<Law> getLaws() {
        return laws;
    }

    public void setLaws(List<Law> laws) {
        this.laws = laws;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecName() {
        return secName;
    }

    public void setSecName(String secName) {
        this.secName = secName;
    }

    public List<News> getNews() {
        return news;
    }

    public void setNews(List<News> news) {
        this.news = news;
    }

    public List<News> getLikes() {
        return likes;
    }

    public void setLikes(List<News> likes) {
        this.likes = likes;
    }
}
