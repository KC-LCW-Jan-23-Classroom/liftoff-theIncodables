import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-game-sessions',
  templateUrl: './display-game-sessions.component.html',
  styleUrls: ['./display-game-sessions.component.css'],
  inputs: ['campaignId'],
})
export class DisplayGameSessionsComponent implements OnInit {
  username: string | null;
  sessions: any[] = [
    { name: 'test', date: '50/69/78' },
    { name: 'test', date: '50/69/78' },
    { name: 'test', date: '50/69/78' },
    { name: 'add', date: '50/69/78' },
  ];
  clickedSession: any = {};

  @Input() setSelectedGameSession: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.username = null;
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });
  }

  ngOnInit(): void {
    this.getSessions().subscribe((sessions: any[]) => {
      this.sessions = sessions;
    });
    console.log('sessions: ', this.sessions);
  }

  getSessions(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/campaigns/all');
  }

  isAddSession(session: any) {
    if (session.name == 'add') {
      return true;
    }
    return false;
  }

  expandGameSession(i: number, session: any) {
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
