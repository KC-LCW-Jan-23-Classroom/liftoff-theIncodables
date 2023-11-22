package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.UserRepository;
import org.theincodables.rpgvibes.models.User;
import org.theincodables.rpgvibes.models.dto.LoginFormDTO;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials ="true")
public class LoginController {

    @Autowired
    UserRepository userRepository;


    public static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    public static HttpSession setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
        return session;
    }


    @PostMapping("")
    public ResponseEntity processLoginForm(@RequestBody LoginFormDTO loginFormDTO,
                                           HttpServletRequest request) {
        System.out.println(loginFormDTO.toString());
        LoginFormDTO convertedLoginDTO = new LoginFormDTO(loginFormDTO.username, loginFormDTO.password);


        User theUser = userRepository.findByUsername(convertedLoginDTO.getUsername());


        String password = convertedLoginDTO.getPassword();

        if (theUser == null || !theUser.isMatchingPassword(password)) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Bad Request");
            return ResponseEntity.badRequest().build();
        }

        HttpSession session = setUserInSession(request.getSession(), theUser);
        return ResponseEntity.ok(theUser);

    }


    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/login";
    }

}