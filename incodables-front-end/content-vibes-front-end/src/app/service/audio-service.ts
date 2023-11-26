import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AudioService {
//   private audioUrlSubject = new BehaviorSubject<string>(''); // Initial audioUrl value
//   audioUrl$ = this.audioUrlSubject.asObservable();

//   set audioUrl(url: string) {
//     this.audioUrlSubject.next(url);
//   }
// }

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
