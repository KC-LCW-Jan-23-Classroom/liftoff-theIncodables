import { Component, OnInit,  Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user-service/user.service';
import { MusicSelectionComponent } from '../music-selection/music-selection.component';
import { GameSessions } from '../model/gamesession-model';



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
  selectedSession: GameSessions | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService, @Inject(MusicSelectionComponent) private musicSelectionComponent: MusicSelectionComponent ) {
    this.username = null;
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });

    this.http.get<Campaign[]>('http://localhost:8080/campaigns/all').subscribe((campaigns) => {
      this.campaigns = campaigns;
    });

    this.selectedSession = undefined;

  }

  ngOnInit(): void {}

  setSelectedGameSession(session:any){
    this.setSelectedGameSession = session;
  }

  onCampaignClick(campaignId: number) {
    this.selectedCampaignId = campaignId;

    this.musicSelectionComponent.selectedTracks = [
      'Track 1',
      'Track 2',
      'Track 3',
    ];
  }
}