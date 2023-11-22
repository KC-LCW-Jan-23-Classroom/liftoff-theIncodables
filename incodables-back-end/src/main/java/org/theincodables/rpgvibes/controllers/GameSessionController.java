package org.theincodables.rpgvibes.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.CampaignRepository;
import org.theincodables.rpgvibes.data.GameSessionRepository;
import org.theincodables.rpgvibes.data.MusicTrackRepository;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.GameSession;
import org.theincodables.rpgvibes.models.MusicTracks;
import org.theincodables.rpgvibes.models.dto.GameSessionDTO;
import org.theincodables.rpgvibes.models.dto.MusicTracksDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameSessionController {

    @Autowired
    private GameSessionRepository gameSessionRepository;
    @Autowired
    private MusicTrackRepository musicTrackRepository;
    @Autowired
    private CampaignRepository campaignRepository;

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<List<GameSession>> getAllGameSessionsByCampaign(@PathVariable Integer campaignId, HttpServletRequest request) {
        //fetch gameSessions that belong to campaignId
        List<GameSession> gameSessions = gameSessionRepository.findByCampaignId(campaignId);
        //handle case where no campaign at campaignId
        if (gameSessions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        //return gameSessions that belong to campaignId
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
        newGameSession.setGameSessionDescription(gameSessionDTO.getGameSessionDescription());
        newGameSession.setCampaign(campaign);
        newGameSession.setDate(gameSessionDTO.getDate());


        // Save the new game session to the database
        newGameSession = gameSessionRepository.save(newGameSession);
        //return newGameSession in response with CREATED status
        return new ResponseEntity<>(newGameSession, HttpStatus.CREATED);
    }

    @GetMapping("/{gameSessionId}")
    public ResponseEntity<GameSession> getGameSessionById(@PathVariable Integer gameSessionId) {
        //fetch gameSession from repository by gameSessionId
        GameSession gameSession = gameSessionRepository.findById(gameSessionId)
                //handle case where gameSession does not exist at gameSessionId
                .orElseThrow(() -> new EntityNotFoundException("GameSession not found"));
        //return gameSession at gameSessionId
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
//Methods for Music tracks
    @GetMapping("/tracks/{gameSessionId}")
    public ResponseEntity<List<MusicTracks>> getAllMusicTracksForGameSession(@PathVariable Integer gameSessionId) {
        //fetch gameSession by gameSessionId
        Optional<GameSession> gameSessionOptional = gameSessionRepository.findById(gameSessionId);
        //handle case where gameSession does not exist
        if (gameSessionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (gameSessionOptional.isPresent()) {
            GameSession gameSession = gameSessionOptional.get();
            List<MusicTracks> musicTracks = gameSession.getMusicTracks();
            return new ResponseEntity<>(musicTracks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/tracks/id/{musicTrackId}")
    public ResponseEntity<MusicTracks> getMusicTrackById(@PathVariable Integer musicTrackId) {
        //fetch track by musicTrackId in path
        MusicTracks musicTracks = musicTrackRepository.findById(musicTrackId)
                .orElseThrow(() -> new EntityNotFoundException("Track not found"));

        return new ResponseEntity<>(musicTracks, HttpStatus.OK);
    }

    @PostMapping("tracks/add/{gameSessionId}")
    public ResponseEntity<MusicTracks> addMusicTracksToGameSession(@PathVariable Integer gameSessionId, @RequestBody MusicTracksDTO musicTracksDTO) {
        Optional<GameSession> gameSessionOptional = gameSessionRepository.findById(gameSessionId);
        //handle case where gameSession does not exist
        if (gameSessionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (gameSessionOptional.isPresent()) {

            GameSession gameSession = gameSessionOptional.get();
            //create new track
            MusicTracks newMusicTrack = new MusicTracks();
            //set the URL
            newMusicTrack.setTrackUrl(musicTracksDTO.getTrackUrl());
            //set the title
            newMusicTrack.setTitle(musicTracksDTO.getTitle());
            //set the freeSoundId
            newMusicTrack.setFreeSoundId(musicTracksDTO.getFreeSoundId());
            //set the gameSession
            newMusicTrack.setGameSession(gameSession);
            //save to musicTrackRepository
            newMusicTrack = musicTrackRepository.save(newMusicTrack);
            //add to gameSession
            gameSession.addMusicTrack(newMusicTrack);
            //save gameSessionRepository
            gameSessionRepository.save(gameSession);

            return new ResponseEntity<>(newMusicTrack, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/remove/{gameSessionId}/{musicTrackId}")
    public ResponseEntity<Void> removeMusicTrackFromGameSession(@PathVariable Integer gameSessionId, @PathVariable Integer musicTrackId, HttpServletRequest request) {
        // Fetch game session
        Optional<GameSession> gameSessionOptional = gameSessionRepository.findById(gameSessionId);
        //handle case where game session is empty
        if (gameSessionOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        GameSession gameSession = gameSessionOptional.get();
        // Retrieve music track by id in path
        Optional<MusicTracks> musicTracksOptional = musicTrackRepository.findById(musicTrackId);

        if (musicTracksOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // GameSession not found
        }

        MusicTracks musicTracks = musicTracksOptional.get();
        // Delete the track
        try {
            musicTrackRepository.delete(musicTracks);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Deletion successful
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Handle other exceptions
        }

    }


}
