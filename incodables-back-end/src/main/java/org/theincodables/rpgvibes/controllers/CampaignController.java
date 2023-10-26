package org.theincodables.rpgvibes.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.theincodables.rpgvibes.data.CampaignDTO;
import org.theincodables.rpgvibes.data.CampaignRepository;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.User;

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
    public ResponseEntity<Optional<Campaign>> getAllCampaigns(HttpServletRequest request) {
        User currentUser = loginController.getUserFromSession(request.getSession());
        if (currentUser == null) {
            // Handle the case where there is no authenticated user
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<Campaign> campaigns = campaignRepository.findById(currentUser.getId());
        return new ResponseEntity<>(campaigns, HttpStatus.OK);
    }

//    @PostMapping("/create")
//    public ResponseEntity<Campaign> createCampaign(@RequestBody CampaignDTO campaignDTO, HttpServletRequest request) {
//        User currentUser = loginController.getUserFromSession(request.getSession());
//        if (currentUser == null) {
//            // Handle the case where there is no authenticated user
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//        // Create a new campaign using data from campaignDTO
//        Campaign newCampaign = new Campaign();
//        newCampaign.setCampaignName(campaignDTO.getCampaignName());
//        newCampaign.setOwner(currentUser);
//
//        campaignRepository.save(newCampaign);
//        // Set the owner, save to the database, and return the result
//        // ...
//
//        return new ResponseEntity<>(newCampaign, HttpStatus.CREATED);
//    }
}
