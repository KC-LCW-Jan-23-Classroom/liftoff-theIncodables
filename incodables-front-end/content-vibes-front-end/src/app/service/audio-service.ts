import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private _audioUrl: string = '';

  constructor() {}

  public getAudioUrl(): string {
    return this._audioUrl;
  }

  public setAudioUrl(url: string) {
    this._audioUrl = url;
  }
}
