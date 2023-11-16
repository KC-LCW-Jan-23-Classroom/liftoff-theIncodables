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
}
