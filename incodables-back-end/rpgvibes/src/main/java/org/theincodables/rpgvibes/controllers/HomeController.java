package org.theincodables.rpgvibes.controllers;

import org.springframework.web.bind.annotation.GetMapping;

public class HomeController {
    @GetMapping
    public String index() {
        return "index";
    }
}
