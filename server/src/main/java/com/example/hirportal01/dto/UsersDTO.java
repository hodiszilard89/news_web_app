package com.example.hirportal01.dto;


import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.Roles;
import com.example.hirportal01.entity.News;


import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.List;


public class UsersDTO {
    private Boolean locked;
    private Long Id;

    private List<News> news;
    @NotBlank
    private String email;
    @NotBlank
    private String password;

    private  String imagePath;

    private String chatName;
    @NotBlank
    private String firstName;
    @NotBlank(message = "nem lehet üres")
    private String secName;
    private List<News> likednews;

    private List<Roles> roles;

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public List<News> getNews() {
        return news;
    }

    public void setNews(List<News> news) {
        this.news = news;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    private List<Comment> comments;



  //  private Date birthDay;
    public UsersDTO() {
    }
    public String getEmail() {
        return email;
    }
    @Column(unique = true, nullable = false)
    public void setEmail(String email) {
        this.email = email;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

//    //public Date getBirthDay() {
//        return birthDay;
//    }

  //  public void setBirthDay(Date birthDay) {
//        this.birthDay = birthDay;
//    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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

    public List<News> getLikednews() {
        return likednews;
    }

    public void setLikednews(List<News> likednews) {
        this.likednews = likednews;
    }

    public List<Roles> getRoles() {
        return roles;
    }

    public void setRoles(List<Roles> roles) {
        this.roles = roles;
    }
    public String rolesToString(){
        StringBuilder result= new StringBuilder();
        for (Roles roles:this.roles){
            result.append(roles.getTitle()).append(" ");
        }
        return result.toString();
    }
}
