package org.theincodables.rpgvibes.security;


import jakarta.servlet.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.theincodables.rpgvibes.controllers.AuthenticationController;
import org.theincodables.rpgvibes.data.UserRepository;
import org.theincodables.rpgvibes.models.User;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


public class AuthenticationFilter implements  Filter {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationController authenticationController;

    private static final List<String> whitelist = Arrays.asList("/login", "/register", "/logout", "/css");

    private static boolean isWhitelisted(String path) {
        for (String pathRoot : whitelist) {
            if (path.startsWith(pathRoot)) {
                return true;
            }
        }
        return false;
    }

    //@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler, FilterChain filterChain) throws IOException, ServletException {

        // Don't require sign-in for whitelisted pages
        if (isWhitelisted(request.getRequestURI())) {
            // returning true indicates that the request may proceed
            return true;
        }

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);

        // The user is logged in
        if (user != null) {
            return true;
        }
        filterChain.doFilter(request, response);
        // The user is NOT logged in
        // response.sendRedirect("/login");
        return false;
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(request, response);
    }
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//
//    }
}
