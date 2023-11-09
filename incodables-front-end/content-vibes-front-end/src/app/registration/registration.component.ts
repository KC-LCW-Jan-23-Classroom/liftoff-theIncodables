import { Component } from '@angular/core';
import { RegisterDTO } from '../model/register';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  user: RegisterDTO;
  errors: any[] = [];
  registrationSuccessful: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.route.params.subscribe((data) => {
        const id = this.route.snapshot.paramMap.get('token');
        console.log('router subscription fired token:' + id);
        if (id === null) return;
        // this.registrationSuccessful = true;
      });
      this.user = new RegisterDTO();
    }

  onSubmit() {
 
    // form validation
    if (!this.user.username || !this.user.email || !this.user.password || !this.user.verify) {
      if (!this.user.username) this.errors.push('Username is required.');
      if (!this.user.email) this.errors.push('Email is required.');
      if (!this.user.password) this.errors.push('Password is required.');
      if (!this.user.verify) this.errors.push('Verification password is required.');
      
      if (this.errors.length > 0) return;
    }

      // Continue with user registration logic
    this.userService.save(this.user).subscribe((result) => {
    console.log(result);
    this.registrationSuccessful = true;
    this.router.navigate(['/login', { username: this.user.username }]);
  });
    
  }

  
}


