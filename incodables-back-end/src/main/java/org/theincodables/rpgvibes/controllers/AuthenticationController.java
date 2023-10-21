package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.UserRepository;
import org.theincodables.rpgvibes.models.User;
import org.theincodables.rpgvibes.models.dto.LoginFormDTO;
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

        RegisterFormDTO convertedRegisterDTO = new RegisterFormDTO(registerFormDTO.verify,registerFormDTO.email,registerFormDTO.username,registerFormDTO.password);

//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Register");
//            return "register";
//        }
//
//        User existingUser = userRepository.findByUsername(convertedRegisterDTO.getUsername());
//
//        if (existingUser != null) {
//            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
//            model.addAttribute("title", "Register");
//            return "register";
//        }
//

        User newUser = new User(convertedRegisterDTO.getUsername(), convertedRegisterDTO.getPassword(), convertedRegisterDTO.getEmail());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return newUser;
    }





//    @PostMapping("/login")
//    public String processLoginForm(@ModelAttribute @Valid LoginFormDTO loginFormDTO,
//                                   Errors errors, HttpServletRequest request,
//                                   Model model) {
//
//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Log In");
//            return "login";
//        }
//
//        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
//
//        if (theUser == null) {
//            errors.rejectValue("username", "user.invalid", "The given username does not exist");
//            model.addAttribute("title", "Log In");
//            return "login";
//        }
//
//        String password = loginFormDTO.getPassword();
//
//        if (!theUser.isMatchingPassword(password)) {
//            errors.rejectValue("password", "password.invalid", "Invalid password");
//            model.addAttribute("title", "Log In");
//            return "login";
//        }
//
//        setUserInSession(request.getSession(), theUser);
//
//        return "redirect:";
//    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "redirect:/login";
    }

}