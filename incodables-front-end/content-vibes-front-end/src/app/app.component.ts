import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLandingPage: boolean = false;
  isUserPanelExpanded: boolean = true; // Set the initial state (expanded by default)

  toggleUserPanel(expanded: boolean) {
    this.isUserPanelExpanded = expanded;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isUserLandingPage = this.activatedRoute.firstChild?.snapshot.data['isUserLandingPage'];
      }
    });
  }
  title = 'content-vibes-front-end';
  isLoggedIn: boolean = false; //login user status
}


