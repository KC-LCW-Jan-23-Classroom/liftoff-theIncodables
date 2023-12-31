import { GameSessions } from '../model/gamesession-model';
import { AudioService } from '../service/audio-service';
import { GameSessionService } from '../service/game-session.service';
import { MusicTrack } from '../model/music-track';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { switchMap } from 'rxjs';

export interface TrackPreview {
  id: string;
  url: string;
  name: string;
}

@Component({
  selector: 'app-music-selection',
  templateUrl: './music-selection.component.html',
  styleUrls: ['./music-selection.component.css'],
})
export class MusicSelectionComponent implements OnInit, OnChanges {
  musicTracks: TrackPreview[] = [
    {
      id: '709397',
      url: 'https://cdn.freesound.org/previews/709/709397_15345947-hq.mp3',
      name: 'Fantasy Cinematic Music Four',
    },
    {
      id: '698282',
      url: 'https://cdn.freesound.org/previews/698/698282_6627602-hq.mp3',
      name: 'Peaceful Fantasy Music',
    },
    {
      id: '511311',
      url: 'https://cdn.freesound.org/previews/511/511311_6627602-hq.mp3',
      name: 'Fantasy Classical Themes',
    },
    {
      id: '595715',
      url: 'https://cdn.freesound.org/previews/595/595715_2282212-hq.mp3',
      name: 'Haunted Hall',
    },
    {
      id: '595853',
      url: 'https://cdn.freesound.org/previews/595/595853_2282212-hq.mp3',
      name: 'Old Ritual',
    },
    {
      id: '614092',
      url: 'https://cdn.freesound.org/previews/614/614092_2282212-hq.mp3',
      name: 'Dark Thriller',
    },
    {
      id: '489035',
      url: 'https://cdn.freesound.org/previews/489/489035_4977896-hq.mp3',
      name: 'Game Music',
    },
    {
      id: '624018',
      url: 'https://cdn.freesound.org/previews/624/624018_4977896-hq.mp3',
      name: 'Cinematic Music',
    },
    {
      id: '569401',
      url: 'https://cdn.freesound.org/previews/569/569401_4977896-hq.mp3',
      name: 'Relinquish',
    },
    {
      id: '569400',
      url: 'https://cdn.freesound.org/previews/569/569400_4977896-hq.mp3',
      name: 'Judgements',
    },
    {
      id: '416632',
      url: 'https://cdn.freesound.org/previews/416/416632_5225777-hq.mp3',
      name: 'Castle Music',
    },
    {
      id: '609900',
      url: 'https://cdn.freesound.org/previews/609/609900_2282212-hq.mp3',
      name: 'Dramatic Orchestra',
    },
  ];

  selectedTracks: string[] = [];
  selectedTrackObjects: TrackPreview[] = [];
  previewPlaying: boolean = false;

  @Input() track: TrackPreview | undefined;
  @Input() activeSession: any;
  selectedSession: any;

  constructor(
    private gameSessionService: GameSessionService,
    protected audioService: AudioService
  ) {
    // this.selectedSession = new GameSessions();
  }

  ngOnInit(): void {
    console.log(
      'Received game session in MusicSelectionComponent:',
      this.activeSession
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeSession']) {
      console.log(
        'activeSession changed:',
        changes['activeSession'].currentValue
      );
      this.activeSession = changes['activeSession'].currentValue;
    }
  }

  addTrack(track: TrackPreview) {
    this.audioService.setAudioUrl(track.url);

    if (track && typeof track === 'object' && track.hasOwnProperty('id')) {
      this.selectedTracks.push(track.id);
      this.selectedTrackObjects.push(track);

      if (this.activeSession != undefined) {
        const trackIdToAdd = track.id;
        this.activeSession.musicTracks.push(trackIdToAdd);
        this.gameSessionService
          .addMusicTracksToGameSession(this.activeSession.id, {
            trackUrl: track.url,
            title: track.name,
            freeSoundId: track.id,
          }).pipe(
            switchMap(() => this.gameSessionService.getAllMusicTracksForGameSession(this.activeSession.id))
          )
          .subscribe(
            (updatedTracks: MusicTrack[]) => {
              this.activeSession.musicTracks = updatedTracks; // Update local data
              console.log('Track added successfully:', updatedTracks);
            },
            (error: any) => {
              console.error('Error adding track:', error);
            }
          );
      }
    }
  }


  playTrackPreview(trackUrl: string) {
    this.audioService.setSelectedTrack(trackUrl);
  }

  stopTrack() {
    this.audioService.pause();
  }
}
