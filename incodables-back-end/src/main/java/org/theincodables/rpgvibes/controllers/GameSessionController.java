package org.theincodables.rpgvibes.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.CampaignRepository;
import org.theincodables.rpgvibes.data.GameSessionRepository;
import org.theincodables.rpgvibes.exceptions.UnauthorizedException;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.GameSession;
import org.theincodables.rpgvibes.models.User;
import org.theincodables.rpgvibes.data.GameSessionRepository;
import org.theincodables.rpgvibes.models.dto.CampaignDTO;
import org.theincodables.rpgvibes.models.dto.GameSessionDTO;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameSessionController {

    @Autowired
    private GameSessionRepository gameSessionRepository;
    @Autowired
    private LoginController loginController;

    @Autowired
    private CampaignController campaignController;
    @Autowired
    private CampaignRepository campaignRepository;

    private User checkAuthorization(HttpServletRequest request) {
        User currentUser = loginController.getUserFromSession(request.getSession());
        if (currentUser == null) {
            throw new UnauthorizedException("User not authorized."); // Create a custom exception for unauthorized access
        }
        return currentUser;
    }



    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<List<GameSession>> getAllGameSessionsByCampaign(@PathVariable Integer campaignId, HttpServletRequest request) {

        List<GameSession> gameSessions = gameSessionRepository.findByCampaignId(campaignId);
        if (gameSessions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(gameSessions, HttpStatus.OK);
    }

    @PostMapping("/create/{campaignId}")
    public ResponseEntity<GameSession> createGameSession(@RequestBody GameSessionDTO gameSessionDTO, @PathVariable Integer campaignId) {
        // Fetch the associated campaign
        Optional<Campaign> campaignOptional = campaignRepository.findById(campaignId);
        //handle case where campaign is empty
        if (campaignOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Campaign campaign = campaignOptional.get();

        // Create a new GameSession
        GameSession newGameSession = new GameSession();
        newGameSession.setGameSessionName(gameSessionDTO.getGameSessionName());
        newGameSession.setCampaign(campaign);
        newGameSession.setDate(LocalDateTime.now());


        // Save the new game session to the database
        newGameSession = gameSessionRepository.save(newGameSession);

        return new ResponseEntity<>(newGameSession, HttpStatus.CREATED);
    }
    @GetMapping("/{gameSessionId}")
    public ResponseEntity<GameSession> getGameSessionById(@PathVariable Integer gameSessionId) {
        GameSession gameSession = gameSessionRepository.findById(gameSessionId)
                .orElseThrow(() -> new EntityNotFoundException("GameSession not found"));

        return new ResponseEntity<>(gameSession, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{campaignId}/{gameSessionId}")
    public ResponseEntity<Void> deleteGameSession(@PathVariable Integer gameSessionId, @PathVariable Integer campaignId, HttpServletRequest request) {
        // Fetch the associated campaign
        Optional<Campaign> campaignOptional = campaignRepository.findById(campaignId);
        //handle case where campaign is empty
        if (campaignOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Campaign campaign = campaignOptional.get();
        // Retrieve the game session by its ID
        Optional<GameSession> gameSessionOptional = gameSessionRepository.findById(gameSessionId);

        if (gameSessionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // GameSession not found
        }

        GameSession gameSession = gameSessionOptional.get();
        // Delete the game session
        try {
            gameSessionRepository.delete(gameSession);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Deletion successful
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Handle other exceptions
        }

    }


}
