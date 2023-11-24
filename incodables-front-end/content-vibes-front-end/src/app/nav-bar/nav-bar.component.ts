import { Component, Input } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['../app.component.css'],
})
export class NavBarComponent {
  isLoggedIn: boolean; // Define the isLoggedIn property
  username: string | null = null; // Define the username property

  constructor(protected userService: UserService, private router: Router) {
    // Initialize the properties as needed
    this.isLoggedIn = false; // You can set the initial value
    this.username = this.userService.getUserInfo();
  }
  async handleLogOut() {
    //get rid of user info stored in local storage
    this.userService.discardUserInfo();
    this.username = null;
    //call API to invalidate session
    this.userService.logout().subscribe(async (result) => {
      await result;
    });
    //route back to login page
    this.router.navigate(['/logout']);
  }
}
