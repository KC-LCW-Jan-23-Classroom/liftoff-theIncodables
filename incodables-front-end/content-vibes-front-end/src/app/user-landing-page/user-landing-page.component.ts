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
  username: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.username = null;
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });
  }

  ngOnInit(): void {}
}
