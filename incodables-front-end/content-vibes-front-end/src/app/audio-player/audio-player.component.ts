import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { AudioService } from '../service/audio-service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnChanges {
  audioUrl: string = '';
  audioElement: HTMLAudioElement = new Audio();
  isGameSelected = false;
  @Input()
  trackUrl!: string;
  @Input()
  trackTitle!: string;
  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef;

  isPlaying = false;



  // private audioServiceSubscription: any;

  constructor(protected audioService: AudioService) {}
  ngOnInit() {
    this.audioService.selectedTrack$.subscribe(trackUrl => {
      this.trackUrl = trackUrl || '';
      // Optionally, you can play the track immediately upon receiving a new URL.
      // this.play();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trackUrl'] && this.trackUrl) {
      this.play();
    }
  }

  onSelectGameSession() {
    this.isGameSelected = true;
  }
  togglePlayPause() {
    if (this.isPlaying) {
      this.audioPlayer.nativeElement.pause();
    } else {
      this.audioPlayer.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  private play() {
    this.audioPlayer.nativeElement.src = this.trackUrl;
    // this.audioPlayer.nativeElement.play();
    this.isPlaying = true;
  }

}
