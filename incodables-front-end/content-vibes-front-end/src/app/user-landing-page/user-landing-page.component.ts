import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  sessions: any[] = [/*{ name: 'test', date: '50/69/78' }, { name: 'test', date: '50/69/78' }, { name: 'test', date: '50/69/78' }*/];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSessions().subscribe((sessions: any[]) => {
      this.sessions = sessions;
    });
  }

  getSessions(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/campaigns/all');
  }
}