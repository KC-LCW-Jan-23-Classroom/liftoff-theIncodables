import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../service/audio-service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audioUrl: string = '';
  audioElement: HTMLAudioElement = new Audio();

  private audioServiceSubscription: any;

  constructor(protected audioService: AudioService) {}

  ngOnInit(): void {
    // this.audioServiceSubscription = this.audioService.audioUrl$.subscribe(url => {
    //   this.audioUrl = url;
    //   this.playAudio();
    // });
  }

  ngOnDestroy(): void {
    //this.audioServiceSubscription.unsubscribe();
  }

  // playAudio() {
  //   if (this.audioUrl) {
  //     this.audioElement.pause();
  //     this.audioElement.currentTime = 0;
  //     this.audioElement.src = this.audioUrl;
  //     this.audioElement.play().catch((error) => {
  //       console.error('Failed to play audio:', error);
  //     });
  //   } else {
  //     // stop audio logic here using this.audioElemnt
  //     this.audioElement.pause();
  //     this.audioElement.currentTime = 0;
  //   }
  // }
}
