import { Component } from '@angular/core';
import { RegisterDTO } from '../model/register';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../app.component.css'],
})
export class RegistrationComponent {
  user: RegisterDTO;

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
    this.user = new RegisterDTO();
  }

  onSubmit() {
    this.userService.save(this.user).subscribe((result) => console.log(result));
  }

  // gotoHomePage() {
  //   this.router.navigate(['/']);
  // }
}
