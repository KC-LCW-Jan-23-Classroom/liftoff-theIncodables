import { Component } from '@angular/core';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private userService: UserService) {}
  logOut() {
    this.userService.logout();
  }
}
