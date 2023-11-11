import { Component, Injectable, OnInit } from '@angular/core';
import { CampaignDTO } from '../model/campaign-dto';
import { CampaignService } from '../service/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-campaign-session',
  templateUrl: './campaign-session.component.html',
  styleUrls: ['./campaign-session.component.css'],
})
export class CampaignSessionComponent {
  campaignName!: string;
  campaignDescription!: string;
  campaignDTO: CampaignDTO;
  errors: string[] = []; // Initialize the errors array
  // registrationSuccessful: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,

  ) {
    console.log('CampaignSessionComponent constructor called');
    this.campaignDTO = new CampaignDTO();
  }

  onSubmit() {
    // Reset the errors array
    this.errors = [];
    if (!this.campaignName || !this.campaignDescription) {
      if (!this.campaignName) this.errors.push('Campaign Name is required.');
      if (!this.campaignDescription) this.errors.push('Description is required.');
      return; // Don't proceed with form submission if there are errors.
    }

    this.campaignDTO.campaignName = this.campaignName;
    this.campaignDTO.campaignDescription = this.campaignDescription;
      //  Call the campaign service to create the campaign
    this.campaignService.createCampaign(this.campaignDTO).subscribe(
      (createdCampaign) => {
        console.log('Campaign created:', createdCampaign);
        this.router.navigate(['/user-landing-page']);

        // Add any additional handling after campaign creation, such as navigation or notifications
      },
      (error) => {
        console.error('Error creating campaign:', error);
      }
    );


  }
  
  // ngOnInit() {
  //   this.route.queryParams.subscribe((params) => {
  //     this.registrationSuccessful = params['registrationSuccessful'] === 'true';
  //     console.log(this.registrationSuccessful); 
  //   });
}


    // // Call the campaign service to create the campaign
    // this.campaignService.createCampaign(this.campaignDTO).subscribe({
    //   next: (createdCampaign) => {
    //     console.log('Campaign created:', createdCampaign);
    //     // Add any additional handling after campaign creation, such as navigation or notifications
    //   },
    //   error: (error) => {
    //     console.error('Error creating campaign:', error);
    //   }
    // });

