import { Component } from '@angular/core';
import { RegisterDTO } from '../model/register';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css'],
})
export class GameSessionComponent {
  gameName: string = "";
  description: string = "";
  date: string = "";
  errors: string[] = []; // Initialize the errors array

  constructor(private userService: UserService) {} // Inject UserService

  updateGameName(newName: string) {
    this.gameName = newName;
  }

  onSubmit() {
    // Reset the errors array
    this.errors = [];

    if (!this.gameName || !this.description || !this.date) {
      if (!this.gameName) this.errors.push('Game Name is required.');
      if (!this.description) this.errors.push('Description is required.');
      if (!this.date) this.errors.push('Date is required.');
      return; // Don't proceed with form submission if there are errors.
    }

    // You can create an object to hold the form data and send it to the service
    const formData = {
      gameName: this.gameName,
      description: this.description,
      date: this.date,
    };
  }
}
  //   this.userService.save(this.gameName).subscribe(
  //     (result) => console.log(result),
  //     (error) => {
      //I think we need to add this to back end data?
  //     }
  //   );
  // }

