import { Component, Input, OnInit } from '@angular/core';
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
  clickedSession: any = {};
  @Input() setSelectedGameSession: any;
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


  isAddSession(session: any) {
 
    if (session.name == 'add') {
    
      return true;
    }
    return false;
  }

  expandGameSession(i: number, session: any) {
    //tamaras function - can go here or in the onclick??? which do we want
    this.setSelectedGameSession(session);

    //first, animate clicked on div. onclick
    const div = document.getElementsByClassName(
      'game-session-card-style--back'
    )[i];
    div.setAttribute(
      'style',
      'width: 300%; height: 200%; transition: width 20ms, height 20ms; transition-timing-function: ease-in;'
    );

    //then, show reeaaal div.
    const gamesesh = document.getElementsByClassName(
      'game-session-expanded'
    )[0];
    this.clickedSession = session;
    setTimeout(function () {
      gamesesh.setAttribute('style', 'display: block;');
    }, 23);

    setTimeout(function () {
      div.setAttribute(
        'style',
        'width: 100%; height: 100%; transition: width 20ms, height 20ms; transition-timing-function: ease-in;'
      );
    }, 25);
  }

  getClickedSession() {
    return this.clickedSession;
  }

  closeClickedSession() {
    const gamesesh = document.getElementsByClassName(
      'game-session-expanded'
    )[0];
    this.clickedSession = {};

    gamesesh.setAttribute('style', 'display: none;');
  }
}
