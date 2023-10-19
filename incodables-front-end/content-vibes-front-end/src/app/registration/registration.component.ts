import { Component } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../app.component.css', '../app.component.css']
})
export class RegistrationComponent {
  user: User;


  
  constructor(private userService: UserServiceService) {
    this.user = new User();}

  onSubmit() {
  
  console.log('called')
    this.userService.register(this.user)
      .subscribe(
        response => {
          // Handle successful registration
          console.log("success", response);
        },
        error => {
          // Handle registration error
          console.log("failure", error);
        }
      );
  }

}
