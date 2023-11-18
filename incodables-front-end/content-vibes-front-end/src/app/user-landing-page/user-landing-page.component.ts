import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { CampaignService } from '../service/campaign.service';
import { Campaign } from '../model/campaign';
import { MusicSelectionComponent } from '../music-selection/music-selection.component';
import { GameSessions } from '../model/gamesession-model';
import { GameSessionService } from '../service/game-session.service';

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
  sessions: any[] = [];

  constructor(
    private userService: UserService,
    private campaignService: CampaignService,
    private gameSessionService: GameSessionService,
    @Inject(MusicSelectionComponent)
    private musicSelectionComponent: MusicSelectionComponent
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

  setSelectedGameSession(session: any) {
    this.setSelectedGameSession = session;
  }

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;
    if (this.selectedCampaignId !== null) {
      this.gameSessionService.getAllGameSessionsByCampaign(this.selectedCampaignId).subscribe((sessions: any[]) => {
        this.sessions = sessions;
        this.sessions.push({name:"add"});
        console.log('sessions: ', this.sessions);
      });
    this.musicSelectionComponent.selectedTracks = [
      'Track 1',
      'Track 2',
      'Track 3',
    ];
  }
}
}
