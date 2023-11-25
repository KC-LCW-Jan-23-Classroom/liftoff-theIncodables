import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { CampaignService } from '../service/campaign.service';
import { Campaign } from '../model/campaign';
import { MusicSelectionComponent } from '../music-selection/music-selection.component';
import { GameSessions } from '../model/gamesession-model';
import { GameSessionService } from '../service/game-session.service';
import { GameSessionDto } from '../model/game-session-dto';
import { GameSession } from '../model/game-session';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  username: string | null;
  campaigns: Campaign[] = [];
  selectedCampaignId: number | null = null;
  selectedGameSession: any;
  // selectedSession: GameSessions | undefined;
  sessions: any[] = [];
  isFirstGameSession: boolean = true; 


  constructor(
    private userService: UserService,
    private campaignService: CampaignService,
    private gameSessionService: GameSessionService,
    @Inject(MusicSelectionComponent)
    private musicSelectionComponent: MusicSelectionComponent,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.username = this.userService.getUserInfo();
  }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any[]) => {
      this.campaigns = campaigns;
      console.log(campaigns);
    });
    console.log('campaigns: ', this.campaigns);
    this.sessions = [{ name: 'add' }];
  }

  setSelectedGameSession(session: any) {
    // this.setSelectedGameSession = session;
    this.selectedGameSession = session;
  }

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;
    if (this.selectedCampaignId !== null) {
      this.gameSessionService.getAllGameSessionsByCampaign(this.selectedCampaignId).subscribe((sessions: any[]) => {
        this.sessions = sessions;
        this.sessions.push({name:"add"});
        this.isFirstGameSession = this.sessions.length === 0;
        console.log('sessions: ', this.sessions);
      });
    this.musicSelectionComponent.selectedTracks = [
      'Track 1',
      'Track 2',
      'Track 3',
    ];
  }
}

createNewGameSession(campaignId: number | null) {
  if (campaignId !== null) {
    const newGameSession: GameSessionDto = {
      gameSessionName: '',
      gameSessionDescription: '',
      date: '',
      campaignId: 0
    };

    this.gameSessionService.createGameSession(campaignId, newGameSession)
      .subscribe((response: GameSession) => {
        console.log('New game session created:', response);
        // Update sessions or handle success scenario
      }, (error: any) => {
        console.error('Error creating game session:', error);
        // Handle error scenario
      });
  }
}
}