package com.example.hirportal01.security;


import com.example.hirportal01.entity.Law;
import com.example.hirportal01.entity.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;



public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 3185970362329652822L;

    private Users user;

    public UserDetailsImpl(Users user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
        List<Law> roles = user.getLaws();
        System.out.println(roles);
//        for (Law role : roles) {
//            authorities.add(new SimpleGrantedAuthority(role.getTitle()));
//            //authorities.add(new SimpleGrantedAuthority("ADMIN"));
//        }
        System.out.println("authorize" +authorities);
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        System.out.println("email: ");
        System.out.println(user.getChatName());
        //return user.getEmail();
        return user.getChatName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}