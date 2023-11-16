import { Observable } from 'rxjs';

export interface GameSessions {name: string, tracks: string[], id: number, trackPreviewUrl: string;}

export class GameSessions extends Observable<GameSessions> {
    id: number;
    name: string;
    tracks: string[];
  
    constructor() {
        super();
        this.id = 0;
        this.name = '';
        this.tracks = [];
      }
    }


export class GameSession {
    id: number = 0;
    name: string = '';
    tracks: string[] = [];
  

    constructor() {}

        
  }