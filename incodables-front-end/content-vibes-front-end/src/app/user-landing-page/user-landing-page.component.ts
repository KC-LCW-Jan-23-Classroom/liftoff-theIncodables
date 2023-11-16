import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';
import { CampaignService } from '../service/campaign.service';
import { Campaign } from '../model/campaign';

// type Campaign = {
//   id: number;
//   name: string;
// };

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  username: string | null;
  campaigns: Campaign[] = [];
  selectedCampaignId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private campaignService: CampaignService
  ) {
    this.username = this.userService.getUserInfo();

  }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any[]) => {
      
      this.campaigns = campaigns;
      console.log(campaigns);
    });
    console.log('campaigns: ', this.campaigns);
  }

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;
    this.router.navigate(['/display-game-session', campaignId]);
  }


}
