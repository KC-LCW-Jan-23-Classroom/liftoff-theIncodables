import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private _audioUrl: string = '';
  private selectedTrackSubject = new BehaviorSubject<string | null>(null);
  selectedTrack$ = this.selectedTrackSubject.asObservable();
  isPlaying = false;



  constructor() {}

  public getAudioUrl(): string {
    return this._audioUrl;
  }

  public setAudioUrl(url: string) {
    this._audioUrl = url;
  }

  setSelectedTrack(trackUrl: string): void {
    this.selectedTrackSubject.next(trackUrl);
    // this.isPlaying=false;
  }

  getSelectedTrack(): string | null {
    return this.selectedTrackSubject.value;
  }
  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    // Add logic to start or pause the track based on this.isPlaying
  }

  pause() {
    this.isPlaying = false;
    // Add logic to pause the track
  }
  play() {
    this.isPlaying = true;
    // Add logic to start playing the track
  }
}
