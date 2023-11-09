import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

type Campaign = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  username: string | null;
  campaigns: Campaign[] = [];
  selectedCampaignId: number | null = null;



  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.username = null;
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });

    this.http.get<Campaign[]>('http://localhost:8080/campaigns/all').subscribe((campaigns) => {
      this.campaigns = campaigns;
    });
  }

  ngOnInit(): void {}

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;
  }
}