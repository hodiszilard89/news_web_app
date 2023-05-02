package com.example.hirportal01.security;

import com.example.hirportal01.entity.Users;
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

import java.util.*;


@Service
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
        Optional<Users> optionalUsers = usersRepository.findUserByEmail(username);
        if (optionalUsers.isPresent()){
            System.out.println(optionalUsers.get().getLikes());
        }
        else{
            throw new UsernameNotFoundException(username);
        }

        UserDetailsImpl udi= new   UserDetailsImpl(optionalUsers.get());
       // System.out.println("asdasdasdasd "+udi.getAuthorities());

        return udi;
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