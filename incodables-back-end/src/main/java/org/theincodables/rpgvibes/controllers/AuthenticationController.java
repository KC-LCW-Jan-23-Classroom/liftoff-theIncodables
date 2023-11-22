package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.UserRepository;
import org.theincodables.rpgvibes.models.User;
import org.theincodables.rpgvibes.models.dto.RegisterFormDTO;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

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

    private static HttpSession setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
        return session;
    }


    @PostMapping("")
    public User processRegistrationForm(@RequestBody RegisterFormDTO registerFormDTO,
                                        HttpServletRequest request) {

        RegisterFormDTO convertedRegisterDTO = new RegisterFormDTO(registerFormDTO.verify, registerFormDTO.email, registerFormDTO.username, registerFormDTO.password);

        User newUser = new User(convertedRegisterDTO.getUsername(), convertedRegisterDTO.getPassword(), convertedRegisterDTO.getEmail());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return newUser;
    }

    @GetMapping("/id/{username}")
    public ResponseEntity<Integer> getUserIdByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/login";
    }

}