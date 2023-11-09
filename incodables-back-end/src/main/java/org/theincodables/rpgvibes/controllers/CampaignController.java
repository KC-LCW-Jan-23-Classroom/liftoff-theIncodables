package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.CampaignRepository;
import org.theincodables.rpgvibes.exceptions.UnauthorizedException;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.User;
import org.theincodables.rpgvibes.models.dto.CampaignDTO;

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

    private User checkAuthorization(HttpServletRequest request) {
        User currentUser = loginController.getUserFromSession(request.getSession());
        if (currentUser == null) {
            throw new UnauthorizedException("User not authorized."); // Create a custom exception for unauthorized access
        }
        return currentUser;
    }

    @PostMapping("/create")
    public ResponseEntity<Campaign> createCampaign(@RequestBody CampaignDTO campaignDTO, HttpServletRequest request) {
        //check if user is authorized
        User currentUser;
        try {
            currentUser = checkAuthorization(request);
            // Your code for authorized access here
        } catch (UnauthorizedException ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Create a new Campaign object
        Campaign newCampaign = new Campaign();
        newCampaign.setCampaignName(campaignDTO.getCampaignName());
        newCampaign.setCampaignDescription(campaignDTO.getCampaignDescription());
        // Set the owner (user)
        newCampaign.setOwner(currentUser);

        // Save the new campaign to the database using the repository
        newCampaign = campaignRepository.save(newCampaign);

        // Return the created campaign with its generated ID
        return new ResponseEntity<>(newCampaign, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Campaign>> getAllCampaigns(HttpServletRequest request) {
        //check if user is authorized
        User currentUser;
        try {
            currentUser = checkAuthorization(request);
            // Your code for authorized access here
        } catch (UnauthorizedException ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Campaign> campaigns = currentUser.getCampaigns();
        if (campaigns.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(campaigns, HttpStatus.OK);
    }


    @GetMapping("/{campaignId}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Integer campaignId, HttpServletRequest request) {
        //check if user is authorized
        User currentUser;
        try {
            currentUser = checkAuthorization(request);
            // Your code for authorized access here
        } catch (UnauthorizedException ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        //find campaign by its id
        Optional<Campaign> campaignOptional = campaignRepository.findById(campaignId);
        //handle case where campaign is empty
        if (campaignOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Campaign campaign = campaignOptional.get();

        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{campaignId}")
    public ResponseEntity<Void> deleteCampaignById(@PathVariable Integer campaignId, HttpServletRequest request) {
        //check if user is authorized
        User currentUser;
        try {
            currentUser = checkAuthorization(request);
            // Your code for authorized access here
        } catch (UnauthorizedException ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Optional<Campaign> campaignOptional = campaignRepository.findById(campaignId);
        // Check if the campaign exists, and handle not found cases
        if (campaignOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        // Delete the campaign
        campaignRepository.deleteById(campaignId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
