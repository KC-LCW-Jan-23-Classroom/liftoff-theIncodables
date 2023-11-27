import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { CampaignService } from '../service/campaign.service';
import { Campaign } from '../model/campaign';
import { MusicSelectionComponent } from '../music-selection/music-selection.component';
import { GameSessionService } from '../service/game-session.service';
import { GameSessionDto } from '../model/game-session-dto';
import { GameSession } from '../model/game-session';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from '../service/audio-service';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  username: string | null;
  campaigns: Campaign[] = [];
  selectedCampaignId: number | null = this.campaigns?.[0]?.id ?? null;
  selectedGameSession: any;
  selectedSession: any;
  sessions: any[] = [];
  isFirstGameSession: boolean = true;
  constructor(
    private userService: UserService,
    private campaignService: CampaignService,
    private gameSessionService: GameSessionService,
    @Inject(MusicSelectionComponent)
    private musicSelectionComponent: MusicSelectionComponent,
    private audioService: AudioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.username = this.userService.getUserInfo();
  }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any[]) => {
      this.campaigns = campaigns;
      this.selectedCampaignId = campaigns?.[0]?.id ?? null;

      this.gameSessionService
        .getAllGameSessionsByCampaign(campaigns?.[0]?.id)
        .subscribe((sessions: any[]) => {
          this.sessions = sessions;
          this.sessions.push({ name: 'add' });
          this.isFirstGameSession = this.sessions.length === 0;
        });
    });

    
  }
  onSelectedGameSessionChange(gameSession: any): void {
    console.log('Received game session:', gameSession);

    this.selectedSession = gameSession;
  }

  setSelectedGameSession(session: any) {
    this.selectedGameSession = session;
  }

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;

    const allNavLinks = document.getElementsByClassName('campaignNavLinks');

    if (allNavLinks.length) {
      for (let i = 0; i < allNavLinks.length; i++) {
        const current = allNavLinks[i] as HTMLElement;
        current.style.color = 'black';
      }
    }
    const navlink = document.getElementById('side-nav-campaigns-' + campaignId);
    if (navlink) {
      navlink.style.color = '#d333ff';
    }

    if (this.selectedCampaignId !== null) {
      this.gameSessionService
        .getAllGameSessionsByCampaign(this.selectedCampaignId)
        .subscribe((sessions: any[]) => {
          this.sessions = sessions;
          this.sessions.push({ name: 'add' });
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
        campaignId: 0,
      };

      this.gameSessionService
        .createGameSession(campaignId, newGameSession)
        .subscribe(
          (response: GameSession) => {
            console.log('New game session created:', response);
            // Update sessions or handle success scenario
          },
          (error: any) => {
            console.error('Error creating game session:', error);
            // Handle error scenario
          }
        );
    }
  }
}
