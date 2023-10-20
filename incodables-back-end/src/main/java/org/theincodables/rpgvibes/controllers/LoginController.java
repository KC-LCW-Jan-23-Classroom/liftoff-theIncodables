package org.theincodables.rpgvibes.controllers;

import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:4200")
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
                                           Errors errors, HttpServletRequest request,
                                           Model model) {
        System.out.println(loginFormDTO.toString());
        LoginFormDTO convertedLoginDTO = new LoginFormDTO(loginFormDTO.username,loginFormDTO.password);


        User theUser = userRepository.findByUsername(convertedLoginDTO.getUsername());


        String password = convertedLoginDTO.getPassword();

        if (!theUser.isMatchingPassword(password)) {
            return new ResponseEntity<>(
                    "login failed",
                    HttpStatus.BAD_REQUEST);
        }

        HttpSession session = setUserInSession(request.getSession(), theUser);
        return ResponseEntity.ok(session);

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