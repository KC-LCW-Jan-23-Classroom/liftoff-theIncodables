import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../service/campaign.service';
import { GameSessionService } from '../service/game-session.service';


@Component({
  selector: 'app-display-game-sessions',
  templateUrl: './display-game-sessions.component.html',
  styleUrls: ['./display-game-sessions.component.css'],
  inputs: ['campaignId'],
})
export class DisplayGameSessionsComponent implements OnInit {
  username: string | null;
  campaignId: number | null = null; 
  sessions: any[] = []
  campaigns: any[]=[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private gameSessionService: GameSessionService) {
    this.username = null;
    this.route.params.subscribe((params) => {
    
      this.username = params['username'];
      this.campaignId = +params['campaignId'];
      console.log('Campaign ID in DisplayGameSessionsComponent:', this.campaignId);
      
      
    });
  }

  ngOnInit(): void {
    if (this.campaignId !== null) {
      this.gameSessionService.getAllGameSessionsByCampaign(this.campaignId).subscribe((sessions: any[]) => {
        this.sessions = sessions;
        
        console.log('sessions: ', this.sessions);
      });
    }
  }
  // getSessions(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:8080/campaigns/all', { withCredentials: true });
  // }

  isAddSession(session: any) {
    console.log("isAddSession called");
    if (session.name == 'add') {
    
      return true;
    }
    return false;
  }
}
