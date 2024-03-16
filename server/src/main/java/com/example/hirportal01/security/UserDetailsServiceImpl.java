package com.example.hirportal01.security;

import com.example.hirportal01.entity.Users;
import com.example.hirportal01.exception.UserIsBlockedException;
import com.example.hirportal01.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@Transactional
@EnableTransactionManagement
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private final UsersRepository usersRepository;
    @Autowired
    private final ModelMapper modelMapper;
    public UserDetailsServiceImpl(UsersRepository usersRepository, ModelMapper modelMapper) {
        this.usersRepository = usersRepository;
        this.modelMapper = modelMapper;
    }
    private List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String chatName;
        String password;

        //System.out.println(usersRepository.findUserByChatName(username).get().getChatName());
        Optional<Users> optionalUsers = usersRepository.findUserByChatName(username);
        if (optionalUsers.isPresent()){
            System.out.println(optionalUsers.get().getLocked());
           if (optionalUsers.get().getLocked()) throw  new UserIsBlockedException(username+" is blocked");
        }
        else{
            throw new UsernameNotFoundException(username);
        }



        return new User("test2","pass", true,true,true,true,optionalUsers.get().getAuthorities());
    }

}
