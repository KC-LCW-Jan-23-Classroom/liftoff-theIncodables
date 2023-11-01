package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.GameSessionRepository;
import org.theincodables.rpgvibes.exceptions.UnauthorizedException;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.GameSession;
import org.theincodables.rpgvibes.models.User;

import java.util.List;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameSessionController {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @GetMapping("/by-campaign/{campaignId}")
    public ResponseEntity<List<GameSession>> getAllGameSessionsByCampaign(@PathVariable Integer campaignId) {
        List<GameSession> gameSessions = gameSessionRepository.findByCampaignId(campaignId);
        return new ResponseEntity<>(gameSessions, HttpStatus.OK);
    }

}
