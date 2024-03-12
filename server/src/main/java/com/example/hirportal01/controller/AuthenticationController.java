package com.example.hirportal01.controller;

import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.dto.TokenDTO;
import com.example.hirportal01.request.AuthenticationRequest;
import com.example.hirportal01.security.UserDetailsServiceImpl;
import com.example.hirportal01.service.impl.UsersServiceImpl;
import com.example.hirportal01.util.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/authentication")
public class AuthenticationController {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl usersDetailService;
    private final UsersServiceImpl usersService;
    public AuthenticationController(JwtUtil jwtUtil, UserDetailsServiceImpl usersDetailService, UsersServiceImpl usersService) {
        this.jwtUtil = jwtUtil;

        this.usersDetailService = usersDetailService;
        this.usersService = usersService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<TokenDTO> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        System.out.println(authenticationRequest.toString());
        UsersDTO usersDTO=
        usersService.findUser(authenticationRequest.getUsername(),authenticationRequest.getPassword());
        TokenDTO tokenDTO = new TokenDTO(jwtUtil.createAndSignToken(usersDTO.getChatName(), usersDTO.rolesToString(), usersDTO.getId()));
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_TYPE, "text/plain; charset=utf-8").body(token);
      //  return token;
        return ResponseEntity.ok().body(tokenDTO);
    }

    private void authenticateUser(AuthenticationRequest authenticationRequest) {

    }

}
