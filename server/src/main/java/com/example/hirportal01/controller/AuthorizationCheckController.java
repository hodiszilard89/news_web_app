package com.example.hirportal01.controller;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;


@RestController
@RequestMapping(path = "/authCheck")
public class AuthorizationCheckController {

    @RequestMapping(path = "/principal", method = RequestMethod.GET)
    public String checkAuthorizationWithPrincipal(Principal principal) {
        return String.format("Welcome, %s!", principal.getName());
    }

    @RequestMapping(path = "/authentication", method = RequestMethod.GET)
    public String checkAuthorizationWithAuthentication(Authentication authentication) {
        return String.format("Welcome, %s!", authentication.getAuthorities());
    }

    @RequestMapping(path = "/request", method = RequestMethod.GET)
    public String checkAuthorizationWithRequest(HttpServletRequest httpServletRequest) {
        return String.format("Welcome, %s!", httpServletRequest.getAttribute("authorizedUsername"));
    }

}
