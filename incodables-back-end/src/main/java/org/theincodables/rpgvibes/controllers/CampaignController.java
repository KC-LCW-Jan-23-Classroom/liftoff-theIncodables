package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.CampaignRepository;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.User;
import org.theincodables.rpgvibes.models.dto.CampaignDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/campaigns")
@CrossOrigin(origins = "http://localhost:4200")
public class CampaignController {
    @Autowired
    private LoginController loginController;

    @Autowired
    private CampaignRepository campaignRepository;


    @GetMapping("/all")
    public ResponseEntity<List<Campaign>> getAllCampaigns(HttpServletRequest request) {
        User currentUser = loginController.getUserFromSession(request.getSession());
        if (currentUser == null) {
            // Handle the case where there is no authenticated user
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Campaign> campaigns = currentUser.getCampaigns();
        return new ResponseEntity<>(campaigns, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Campaign> createCampaign(@RequestBody CampaignDTO campaignDTO, HttpServletRequest request) {
        User currentUser = loginController.getUserFromSession(request.getSession());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Create a new Campaign object
        Campaign newCampaign = new Campaign();
        newCampaign.setCampaignName(campaignDTO.getCampaignName());
        // Set the owner (user)
        newCampaign.setOwner(currentUser);

        // Save the new campaign to the database using the repository
        newCampaign = campaignRepository.save(newCampaign);

        // Return the created campaign with its generated ID
        return new ResponseEntity<>(newCampaign, HttpStatus.CREATED);
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Integer campaignId, HttpServletRequest request) {
        User currentUser = loginController.getUserFromSession(request.getSession());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<Campaign> campaignOptional = campaignRepository.findById(campaignId);

        if (campaignOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Campaign campaign = campaignOptional.get();

        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }
}
