import { Component, Input, OnInit } from '@angular/core';
import { GameSessions } from '../model/gamesession-model';

export interface TrackPreview {
  id: string;
  url: string;
  name: string;
}

@Component({
  selector: 'app-music-selection',
  templateUrl: './music-selection.component.html',
  styleUrls: ['./music-selection.component.css']
})

export class MusicSelectionComponent implements OnInit {
  musicTracks: TrackPreview[] = [
    { id: '709397', url: 'https://freesound.org/people/guitarman213/sounds/709397/', name: 'Fantasy Cinematic Music Four' },
    { id: '698282', url: 'https://freesound.org/people/TheoJT/sounds/698282/', name: 'Peaceful Fantasy Music' },
    { id: '511311', url: 'https://freesound.org/people/TheoJT/sounds/511311/', name: 'Fantasy Classical Themes' },
    { id: '595715', url: 'https://freesound.org/people/szegvari/sounds/595715/', name: 'Haunted Hall - Cinematic Fantasy Music Thriller Orchestra atmo Amb soundscape.wav' },
    { id: '595853', url: 'https://freesound.org/people/szegvari/sounds/595853/', name: 'Old ritual - Fantasy Background Soundscape Haunted Atmo Music Synth Drum Orchestra - Mastered.wav' },
    { id: '614092', url: 'https://freesound.org/people/szegvari/sounds/614092/', name: 'Dark Atmo Sea Beach Sad Mood Myst Thriller Fantasy.wav' },
    { id: '489035', url: 'https://freesound.org/people/Michael-DB/sounds/489035/', name: 'Game-Music-01' },
    { id: '624018', url: 'https://freesound.org/people/Michael-DB/sounds/624018/', name: 'Cinematic Music-04' },
    { id: '569401', url: 'https://freesound.org/people/Michael-DB/sounds/569401/', name: 'Cinematic Music - Relinquish' },
    { id: '569400', url: 'https://freesound.org/people/Michael-DB/sounds/569400/', name: 'Cinematic Music - Judgements' },
    { id: '416632', url: 'https://freesound.org/people/Sirkoto51/sounds/416632/', name: 'Castle Music Loop #1' },
    { id: '609900', url: 'https://freesound.org/people/szegvari/sounds/609900/', name: 'Slow Sea Orchestra Big Orchestral String Piano Myst Drama Love Cinematic Music Surround.wav' }
  ];
  
  selectedTracks: string[] = [];
  selectedTrackObjects: TrackPreview[] = [];


  @Input() track: TrackPreview | undefined;
  @Input() selectedSession: GameSessions | undefined;

  
  constructor() {
    this.selectedSession = new GameSessions();
  }

  ngOnInit(): void { }

  addTrack(track: TrackPreview) {
    if (track && typeof track === 'object' && track.hasOwnProperty('id')) {
      this.selectedTracks.push(track.id);
      this.selectedTrackObjects.push(track);
  
      if (this.selectedSession != undefined) {
        const trackIdToAdd = track.id;
        this.selectedSession.tracks.push(trackIdToAdd);
      }
    }
  }

  playTrackPreview() {
      const audioElement = document.getElementById('track-preview-audio');

      if (audioElement instanceof HTMLAudioElement && this.track) {
        audioElement.src = this.track.url;
        audioElement.play();
      } 
  }
}
