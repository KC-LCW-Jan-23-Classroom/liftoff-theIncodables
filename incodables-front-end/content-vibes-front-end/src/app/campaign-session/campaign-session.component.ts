import { UserService } from '../service/user-service/user.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { CampaignDTO } from '../model/campaign-dto';
import { CampaignService } from '../service/campaign.service';

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

  constructor(
    private campaignService: CampaignService,
    private userService: UserService
  ) {
    console.log('CampaignSessionComponent constructor called');
    this.campaignDTO = new CampaignDTO();
  }

  onSubmit() {
    // Reset the errors array
    this.errors = [];
    if (!this.campaignName || !this.campaignDescription) {
      if (!this.campaignName) this.errors.push('Campaign Name is required.');
      if (!this.campaignDescription)
        this.errors.push('Description is required.');
      return; // Don't proceed with form submission if there are errors.
    }

    // Retrieve the user's ID from the user service
    const user = this.userService.getUserContext();
    console.log(this.userService.getUserContext());

    if (user) {
      // Set the owner property in the CampaignDTO with the user ID
      this.campaignDTO.owner = user.id;
      this.campaignDTO.campaignName = this.campaignName;
      this.campaignDTO.campaignDescription = this.campaignDescription;

      // Call the campaign service to create the campaign
      this.campaignService.createCampaign(this.campaignDTO).subscribe(
        (createdCampaign) => {
          console.log('Campaign created:', createdCampaign);
          // Add any additional handling after campaign creation, such as navigation or notifications
        },
        (error) => {
          console.error('Error creating campaign:', error);
        }
      );
    } else {
      console.error('User context not found.');
    }
  }
}

// import { Component } from '@angular/core';
// import { CampaignService } from '../service/campaign.service';
// import { UserService } from '../service/user-service/user.service';
// import { CampaignDTO } from '../model/campaign-dto';

// @Component({
//   selector: 'app-campaign',
//   templateUrl: './campaign.component.html',
//   styleUrls: ['./campaign.component.css']
// })
// export class CampaignComponent {
//   campaignName!: string;
//   campaignDescription!: string;
//   campaignDTO: CampaignDTO;

//   constructor(

//     private campaignService: CampaignService,
//     private userService: UserService
//   ) {
//     this.campaignDTO = new CampaignDTO();
//   }

//   onSubmit(): void {
//     // Retrieve the user's ID from the user service
//     const userId = this.userService.getUserContext();

//     if (userId) {
//       // Set the owner property in the CampaignDTO with the user ID
//       this.campaignDTO.owner = userId;
//       this.campaignDTO.campaignName = this.campaignName;
//       this.campaignDTO.campaignDescription = this.campaignDescription;

//       // Call the campaign service to create the campaign
//       this.campaignService.createCampaign(this.campaignDTO).subscribe(
//         (createdCampaign: any) => {
//           console.log('Campaign created:', createdCampaign);
//           // Add any additional handling after campaign creation, such as navigation or notifications
//         },
//         error => {
//           console.error('Error creating campaign:', error);
//         }
//       );
//     } else {
//       console.error('User context not found.');
//     }
//   }
// }

// import { Component } from '@angular/core';
// import { CampaignDTO } from '../model/campaign-dto';
// import { CampaignService } from '../service/campaign.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-campaign-session',
//   templateUrl: './campaign-session.component.html',
//   styleUrls: ['./campaign-session.component.css']
// })
// export class CampaignSessionComponent {
//   campaign: CampaignDTO = new CampaignDTO();
//   errors: string[] = []; // Initialize the errors array
//   campaignName: string | undefined;
//   description: string | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private campaignService: CampaignService
//   ) {}

//   onSubmit() {
//     // Reset the errors array
//     this.errors = [];

//     // Assign the value of campaignName and campaignDescription
//     this.campaign.campaignName = this.campaignName;
//     this.campaign.campaignDescription = this.description;

//     if (!this.campaign.campaignName || !this.campaign.campaignDescription) {
//       if (!this.campaign.campaignName) this.errors.push('Campaign Name is required.');
//       if (!this.campaign.campaignDescription) this.errors.push('Description is required.');
//       return; // Don't proceed with form submission if there are errors.
//     }

//     // Call the campaign service to create the campaign
//     this.campaignService.createCampaign(this.campaign).subscribe(
//       (response) => {
//         // Handle the success case
//         console.log('Campaign created:', response);
//         // You can handle the response from the backend here
//       },
//       (error) => {
//         // Handle errors if the HTTP request fails
//         console.error('Error creating campaign:', error);
//         // Update this.errors or perform other error handling here
//       }
//     );
//   }
// }

// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CampaignDTO } from '../model/campaign-dto';
// import { CampaignService } from '../service/campaign.service';

// @Component({
//   selector: 'app-campaign-session',
//   templateUrl: './campaign-session.component.html',
//   styleUrls: ['./campaign-session.component.css'],
// })
// export class CampaignSessionComponent {
//   campaign: CampaignDTO;
//   errors: string[] = []; // Initialize the errors array

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private campaignService: CampaignService
//   ) {
//     this.route.params.subscribe((params) => {
//       const campaignId = params['campaign-session'];
//       if (campaignId) {
//         this.campaignService.getCampaignById(campaignId).subscribe((data) => {
//           this.campaign = new CampaignDTO;
//           this.campaign = data; // Assign the fetched data to the campaign object
//         });
//       }

//     });
//   }
//   onSubmit() {
//     // Reset the errors array
//     this.errors = [];

//     if (!this.campaign.campaignName || !this.campaign.campaignDescription) {
//       if (!this.campaign.campaignName) this.errors.push('Campaign Name is required.');
//       if (!this.campaign.campaignDescription) this.errors.push('Description is required.');
//       return; // Don't proceed with form submission if there are errors.
//     }

//     // You can create an object to hold the form data and send it to the service
//     const formData: CampaignDTO = {
//       campaignName: this.campaign.campaignName, // Ensure campaign.campaignName is correctly set
//       campaignDescription: this.campaign.campaignDescription, // Use the value from the description field
//     };

//     this.campaignService.createCampaign(formData).subscribe(
//       (response) => {
//         // Handle the success case
//         console.log('Campaign created:', response);
//         // Get the ID from the response
//         const campaignId = response.id;

//         // Navigate to the campaign session using the obtained ID
//         this.router.navigate(['/campaign-session', campaignId]);
//       },
//       (error) => {
//         // Handle errors if the HTTP request fails
//         console.error('Error creating campaign:', error);
//         // Update this.errors or perform other error handling here
//       }
//     );
//   }
// }
