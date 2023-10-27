import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css'],
})
export class UserLandingPageComponent implements OnInit {
  sessions: any[] = [{ name: 'test', date: '50/69/78' }, { name: 'test', date: '50/69/78' }, { name: 'test', date: '50/69/78' }];

  constructor() {}

  ngOnInit(): void {}
}
