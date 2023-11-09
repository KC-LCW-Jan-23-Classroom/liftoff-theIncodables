import { Component } from '@angular/core';
import { UserService } from './service/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'content-vibes-front-end';
}
