import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from '../model/register';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-campaign-session',
  templateUrl: './campaign-session.component.html',
  styleUrls: ['./campaign-session.component.css']
})
export class CampaignSessionComponent implements OnInit{
  campaignName: string = "";
  description: string = "";
  date: string = "";
  errors: string[] = []; // Initialize the errors array
  registrationSuccessful: boolean | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute ,
    private router: Router
  ) {}

  updateCampaignName(newName: string) {
    this.campaignName = newName;
  }

  onSubmit() {
    // Reset the errors array
    this.errors = [];

    if (!this.campaignName || !this.description || !this.date) {
      if (!this.campaignName) this.errors.push('Campaign Name is required.');
      if (!this.description) this.errors.push('Description is required.');
      if (!this.date) this.errors.push('Date is required.');
      return; // Don't proceed with form submission if there are errors.
    }

    // You can create an object to hold the form data and send it to the service
    const formData = {
      campaignName: this.campaignName,
      description: this.description,
      date: this.date,
    };
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.registrationSuccessful = params['registrationSuccessful'] === 'true';
      console.log(this.registrationSuccessful); 
    });
}
}
