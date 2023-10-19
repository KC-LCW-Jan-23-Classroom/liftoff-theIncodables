import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //   credentials: any = {}; // Data binding with your login form
  //
  //   constructor(private userService: UserService) {}
  //
  //   login() {
  //     this.userService.login(this.credentials)
  //       .subscribe(
  //         response => {
  //           // Handle successful login
  //           console.log("success")
  //         },
  //         error => {
  //           // Handle login error
  //           console.log("failure")
  //         }
  //       );
  //   }
}
