import { Component } from '@angular/core';
import { RegisterDTO } from '../model/register';
import { UserService } from '../service/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDTO } from '../model/login-dto';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

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

  user: LoginDTO;
  errors: string[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    // this.route.params.subscribe((data) => {
    //   const id = this.route.snapshot.paramMap.get('token');
    //   console.log('router subscription fired token:' + id);
    //   if (null == id) return;
    // });
    this.user = new LoginDTO();
  }



  onSubmit() {
    // Reset the errors array
    this.errors = [];

    if (!this.user.username || !this.user.password) {
      if (!this.user.username) this.errors.push('Username is required.');
      if (!this.user.password) this.errors.push('Password is required.');
      return; // Don't proceed with form submission if there are errors.
    }

    this.userService.save(this.user).subscribe(
      (result) => console.log(result),
      (error) => {
        // Handle any additional error handling here if needed.
      }
    );
  }
}