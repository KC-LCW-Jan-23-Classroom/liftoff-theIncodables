import { Component} from '@angular/core';
import { AudioService } from '../service/audio-service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent {
  audioUrl: string = '';
  audioElement: HTMLAudioElement = new Audio();
  isGameSelected = false;

  // private audioServiceSubscription: any;

  constructor(protected audioService: AudioService) {}

  onSelectGameSession() {
    this.isGameSelected = true;
  }
}
