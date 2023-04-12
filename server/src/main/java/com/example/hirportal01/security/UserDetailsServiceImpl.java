package com.example.hirportal01.security;

import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.Law;
import com.example.hirportal01.entity.Users;
import com.example.hirportal01.exception.EntityNotFoundException;
import com.example.hirportal01.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
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
            chatName = optionalUsers.get().getChatName();
            password=optionalUsers.get().getPassword();
        }
        else{
            throw new UsernameNotFoundException(username);
        }


        return new User(chatName, password,Collections.emptyList());
    }

}


//        List<Law> laws = usersDTO.getLaws();
//        for (Law law: laws ) {
//            roles.add(new SimpleGrantedAuthority(law.getTitle()));
//        }

//    private void findUser(String username) {
//        if (!"test".equals(username)) {
//            throw new RuntimeException("User not found");
//        }
//    }