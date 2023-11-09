import { Component } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDTO } from '../model/login-dto';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoginDTO;

  errors: any[] = [];
  isLoggedIn: boolean = false; 
  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.route.params.subscribe((data) => {
      const id = this.route.snapshot.paramMap.get('token');
      console.log('router subscription fired token:' + id);
      if (null == id) return;
    });
    this.user = new LoginDTO();

  }

  onSubmit() {
    //handle emtpy fields etc

    if (!this.user.username || !this.user.password) {
      if (!this.user.username) this.errors.push('Username is required.');
      if (!this.user.password) this.errors.push('Password is required.');
      return;
    }

    this.userService.login(this.user).subscribe((result) => {
      if (result) {
;
        console.log(result);
   
        this.router.navigate(['/user-landing-page', { username: this.user.username }]);
    
      } else {
        console.log("Login failed.");
      }
    });
  }
}