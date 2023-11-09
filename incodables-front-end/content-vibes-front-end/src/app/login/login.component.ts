import { Component } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDTO } from '../model/login-dto';
import { UserContext } from '../model/user-context';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoginDTO;
  //userContext: UserContext;
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
    //this.userContext = new UserContext();
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
        this.userService.setUserContext(result);
        console.log(this.userService.getUserContext());
        this.router.navigate([
          '/user-landing-page',
          { username: this.user.username },
        ]);
      } else {
        console.log('Login failed.');
      }
    });
  }
}
