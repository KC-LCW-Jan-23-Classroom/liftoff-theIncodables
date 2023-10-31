package org.theincodables.rpgvibes.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game/{gameId}")
@CrossOrigin(origins = "http://localhost:4200")
public class GameSessionController {
}
