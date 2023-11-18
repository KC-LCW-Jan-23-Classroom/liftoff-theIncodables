import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionDto } from '../model/game-session-dto';
import { GameSessionService } from '../service/game-session.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css'],
  
})
export class GameSessionComponent implements OnInit {
  gameSessionName!: string;
  gameSessionDescription!: string;
  date!: string;
  gameSessionDTO: GameSessionDto;
  campaignId!: number;
  errors: string[] = []; // Initialize the errors array
  // registrationSuccessful: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameSessionService: GameSessionService,

  ) {
    this.gameSessionDTO = new GameSessionDto();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.campaignId = +params['campaignId'];
      console.log('Campaign ID:', this.campaignId);
    });
  }

  onSubmit() {
    console.log("clicked")
    // Reset the errors array
    this.errors = [];
    if (!this.gameSessionName || !this.gameSessionDescription|| !this.date ) {
      if (!this.gameSessionName) this.errors.push('Game Session Name is required.');
      if (!this.gameSessionDescription) this.errors.push('Description is required.');
      if (!this.date)this.errors.push('Date is required');
      return; // Don't proceed with form submission if there are errors.
    }

    this.gameSessionDTO.gameSessionName = this.gameSessionName;
    this.gameSessionDTO.gameSessionDescription = this.gameSessionDescription;
    this.gameSessionDTO.date = this.date;
      //  Call the campaign service to create the campaign
    this.gameSessionService.createGameSession(this.campaignId,this.gameSessionDTO).subscribe(
      (createdGameSession) => {
        console.log('Form values:', this.gameSessionName, this.gameSessionDescription, this.date);

        console.log('Game Session created:', createdGameSession);
        this.router.navigate(['/user-landing-page']);

        // Add any additional handling after campaign creation, such as navigation or notifications
      },
      (error) => {
        console.error('Error creating game session:', error);
      }
    );


  }
}