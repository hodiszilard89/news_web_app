package com.example.hirportal01.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
public class Users implements UserDetails  {
    private Boolean locked;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
   // private Date birthDay;

    private  String imagePath;
    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany (cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "users_comment",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "comment_id"))
    private List<Comment> comments;
    private String password;

    public void removeFromLikes(News news){
        this.likednews.remove(news);
    }

    @ManyToMany(mappedBy = "users")
    @JsonBackReference(value="userRoles")
    private Set<Roles> roles = new HashSet<>();

    @OneToMany(mappedBy = "writer")

    private List<News> news;

    @ManyToMany(mappedBy = "likes")
    private Set<News> likednews;

    public Set<News> getLikednews() {
        return likednews;
    }

    public void setLikednews(Set<News> likednews) {
        this.likednews = likednews;
    }


    public void addLikedNews( News news){
        this.likednews.add(news);
    }
    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    private String chatName;

    private String firstName;

    private String secName;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
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

    public Set<News> getLikes() {
        return likednews;
    }

    public void setLikes(Set<News> likedNews) {
        this.likednews = likedNews;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Users() {
        setLocked(false);
    }



    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authoritySet = new HashSet<>();
        for (var r:getRoles()){
            var sga=new SimpleGrantedAuthority(r.getTitle());
            authoritySet.add(sga);
        }
        return authoritySet;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    @Override
    public String getUsername() {
        return this.chatName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Users otherObject = (Users) obj;
        return this.id.equals(otherObject.getId());
    }
}


