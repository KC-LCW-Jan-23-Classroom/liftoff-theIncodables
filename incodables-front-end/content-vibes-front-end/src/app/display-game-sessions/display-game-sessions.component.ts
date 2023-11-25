import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameSessionService } from '../service/game-session.service';
import { TrackPreview } from '../music-selection/music-selection.component';


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
  constructor(private gameSessionService: GameSessionService, ) {
    this.username = null;
  }
  ngOnInit(): void {
    if (this.campaignId !== null) {
      this.gameSessionService
        .getAllGameSessionsByCampaign(this.campaignId)
        .subscribe((sessions: any[]) => {
          this.sessions = sessions;
          this.sessions.push({ name: 'add' });
          console.log('sessions: ', this.sessions);
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
    // console.log(session);
    // console.log('Music Tracks:', session.musicTracks);
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
  playTrack(track: TrackPreview) {
    const audioElement = document.getElementById(
      'audio-player'
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.src = track.url;
      audioElement.play();
    }
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
}
