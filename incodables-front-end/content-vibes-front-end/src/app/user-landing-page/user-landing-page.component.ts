import { Component, OnInit,  Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';
import { CampaignService } from '../service/campaign.service';
import { Campaign } from '../model/campaign';
import { MusicSelectionComponent } from '../music-selection/music-selection.component';
import { GameSessions } from '../model/gamesession-model';





@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})

export class UserLandingPageComponent implements OnInit {
  username: string | null;
  campaigns: Campaign[] = [];
  selectedCampaignId: number | null = null;
  selectedSession: GameSessions | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private campaignService: CampaignService,
    @Inject(MusicSelectionComponent) private musicSelectionComponent: MusicSelectionComponent) {
    this.username = this.userService.getUserInfo();

  }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any[]) => {
      
      this.campaigns = campaigns;
      console.log(campaigns);
    });
    console.log('campaigns: ', this.campaigns);
  }

  setSelectedGameSession(session:any){
    this.setSelectedGameSession = session;
  }

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;
    this.router.navigate(['/display-game-session', campaignId]);

    this.musicSelectionComponent.selectedTracks = [
      'Track 1',
      'Track 2',
      'Track 3',
    ];
  }


}
