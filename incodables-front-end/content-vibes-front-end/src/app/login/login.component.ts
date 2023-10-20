import { Component } from '@angular/core';
import { RegisterDTO } from '../register';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDTO } from '../login-dto';
import { HttpResponse } from '@angular/common/http';

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
    //handle emtpy fields etc

    this.userService.findByUsername(this.user).subscribe((result) => {
      if (result.ok) {
        this.router.navigate(['/']);
      }
    });
  }
}
