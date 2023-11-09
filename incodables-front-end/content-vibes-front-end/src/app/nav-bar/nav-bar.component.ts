import { Component } from '@angular/core';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['../app.component.css'],
})
export class NavBarComponent {
  isLoggedIn: boolean; // Define the isLoggedIn property
  username: string; // Define the username property

  constructor(private userService: UserService) {
    // Initialize the properties as needed
    this.isLoggedIn = false; // You can set the initial value
    this.username = ''; // You can set the initial value
  }

  logOut() {
    this.userService.logout();
  }
}
