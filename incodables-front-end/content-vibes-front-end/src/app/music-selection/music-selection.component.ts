import { Component, Input, OnInit } from '@angular/core';
import { GameSessions } from '../model/gamesession-model';

export interface TrackPreview {
  id: string;
  title: string;
  artist: string;
  album: string;
  previewUrl: string;
}

@Component({
  selector: 'app-music-selection',
  templateUrl: './music-selection.component.html',
  styleUrls: ['./music-selection.component.css'],
})
export class MusicSelectionComponent implements OnInit {
  selectedTracks: string[] = [];
  selectedTrackObjects: TrackPreview[] = [];

  @Input() track: TrackPreview | undefined;
  @Input() selectedSession: GameSessions | undefined;

  constructor() {
    this.selectedSession = new GameSessions();

    this.selectedSession.subscribe((session) => {
      const trackPreviewAudioElement = document.getElementById(
        'track-preview-audio'
      );
      if (trackPreviewAudioElement) {
        const htmlAudioElement = trackPreviewAudioElement as HTMLAudioElement;
        htmlAudioElement.src = session.trackPreviewUrl;
      }
    });
  }

  ngOnInit(): void {}

  addTrack() {
    if (
      this.track &&
      typeof this.track === 'object' &&
      this.track.hasOwnProperty('id')
    ) {
      this.selectedTracks.push(this.track.id);
      this.selectedTrackObjects.push(this.track);

      if (this.selectedSession != undefined) {
        const trackIdToAdd = this.track.id;
        this.selectedSession.tracks.push(trackIdToAdd);
      }
    }
  }

  playTrackPreview() {
    // Get the audio element for the track preview.
    const audioElement = document.getElementById('track-preview-audio');

    // If the audio element exists, play it.
    if (audioElement instanceof HTMLAudioElement) {
      audioElement.play();
    }
  }
}
