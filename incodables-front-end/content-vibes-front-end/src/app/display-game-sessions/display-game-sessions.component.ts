import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameSessionService } from '../service/game-session.service';
import { TrackPreview } from '../music-selection/music-selection.component';
import { AudioService } from '../service/audio-service';
import { MusicTrack } from '../model/music-track';

@Component({
  selector: 'app-display-game-sessions',
  templateUrl: './display-game-sessions.component.html',
  styleUrls: ['./display-game-sessions.component.css'],
  inputs: ['campaignId'],
})
export class DisplayGameSessionsComponent implements OnInit {
  @Output() activeGameSession = new EventEmitter<any>();
  username: string | null;
  @Input() campaignId: number | null = null;
  @Input() sessions: any[] = [];
  clickedSession: any = {};
  @Input() setSelectedGameSession: any;
  isEditing = false;
  constructor(
    private gameSessionService: GameSessionService,
    private audioService: AudioService
  ) {
    this.username = null;
  }
  ngOnInit(): void {
    if (this.campaignId !== null) {
      this.gameSessionService
        .getAllGameSessionsByCampaign(this.campaignId)
        .subscribe((sessions: any[]) => {
          this.sessions = sessions;
          this.sessions.push({ name: 'add' });
        });
    }
  }

  isAddSession(session: any) {
    if (session.name == 'add') {
      return true;
    }
    return false;
  }

  expandGameSession(i: number, session: any) {
    //first, animate clicked on div. onclick

    const div = document.getElementsByClassName(
      'game-session-card-style--back'
    )[i];
    div.setAttribute(
      'style',
      'width: 300%; height: 200%; transition: width 20ms, height 20ms; transition-timing-function: ease-in;'
    );

    //then, show reeaaal div.
    const gamesesh = document.getElementsByClassName(
      'game-session-expanded'
    )[0];
    this.clickedSession = session;
    this.activeGameSession.emit(session);
    setTimeout(function () {
      gamesesh.setAttribute('style', 'display: block;');
    }, 23);

    setTimeout(function () {
      div.setAttribute(
        'style',
        'width: 100%; height: 100%; transition: width 20ms, height 20ms; transition-timing-function: ease-in;'
      );
    }, 25);
  }

  getClickedSession() {
    return this.clickedSession;
  }

  closeClickedSession() {
    const gamesesh = document.getElementsByClassName(
      'game-session-expanded'
    )[0];
    this.clickedSession = {};

    gamesesh.setAttribute('style', 'display: none;');
  }
  playTrack(track: MusicTrack) {
    this.audioService.setSelectedTrack(track.trackUrl);
  }
  removeTrack(gameSessionId: number, musicTrackId: number, index: number) {
    this.gameSessionService
      .removeMusicTrackFromGameSession(gameSessionId, musicTrackId)
      .subscribe(
        () => {
          console.log('Music track removed successfully');
          this.clickedSession.musicTracks.splice(index, 1);
        },
        (error) => {
          console.error('Error removing music track', error);
        }
      );
  }
  clearTrackTitle(track: any) {
    // Check if the track has an originalTitle property
    if (!track.hasOwnProperty('originalTitle')) {
      // If not, set the originalTitle to the current title
      track.originalTitle = track.title;
    }
  
    // Check if the title is empty
    if (!track.title.trim()) {
      // If it's empty, set it back to the original title
      track.title = track.originalTitle;
      
    } else {
      // If it's not empty, clear the track title

      track.originalTitle = track.title;
      track.title = '';
      
    }
  
    // Manually reset the form control for this track
    const editableButton = document.querySelector(`#editable-button-${track.id}`);
    if (editableButton) {
      editableButton.innerHTML = ''; // Clear the content of the editable-button div
  
      // Manually reset the form control
      editableButton.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  saveTrackName(track: any) {
    const trackIdToString = track.id.toString();
    // Check if the title is empty
    if (!track.title.trim()) {
      track.name = track.title;
      console.log('Title is empty. No need to update.');
      return;
    }

      // Check if the title is the same as the original title
  if (track.title === track.originalTitle) {
    console.log('Title is not changed. No need to update.');
    return;
  }
    // Assuming you have a method in your service to update the track name
    this.gameSessionService
      .updateMusicTrackName(trackIdToString, track.title)
      .subscribe(
        () => {
          console.log('Track name updated successfully');
          track.originalTitle = track.title;
          // Optionally, you can update your UI or perform additional actions here
        },
        (error: any) => {
          console.error('Error updating track name:', error);
          // Handle the error appropriately, e.g., show an error message to the user
        }
      );
  }

  //method for debugging
  //   logTrackInfo(track: TrackPreview): void {
  //   console.log('Track Info:', track);
  // }
}
