import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameSession } from '../model/game-session';
import { GameSessionDto } from '../model/game-session-dto';
import { MusicTrack } from '../model/music-track';
import { MusicTrackDto } from '../model/music-track-dto';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {
  private baseUrl = 'http://localhost:8080/game'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  createGameSession(campaignId: number,gameSessionDTO: GameSessionDto): Observable<GameSession> {
    console.log('game session:', gameSessionDTO);
    return this.http.post<GameSession>(
      `${this.baseUrl}/create/${campaignId}`,
      gameSessionDTO,
      { withCredentials: true }
    );
  }

  getAllGameSessionsByCampaign(campaignId: number): Observable<GameSession[]> {

    return this.http.get<GameSession[]>(`${this.baseUrl}/campaign/${campaignId}`,{ withCredentials: true });
  }

  getGameSessionById(gameSessionId: number): Observable<GameSession> {
    return this.http.get<GameSession>(`${this.baseUrl}/${gameSessionId}`,{withCredentials:true});
  }

  deleteGameSession(campaignId: number, gameSessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${campaignId}/${gameSessionId}`);
  }
  getAllMusicTracksForGameSession(gameSessionId: number): Observable<MusicTrack[]> {
    return this.http.get<MusicTrack[]>(`${this.baseUrl}/tracks/${gameSessionId}`);
  }

  getMusicTrackById(musicTrackId: number): Observable<MusicTrack> {
    return this.http.get<MusicTrack>(`${this.baseUrl}/tracks/id/${musicTrackId}`);
  }

  addMusicTracksToGameSession(gameSessionId: number, musicTracksDTO: MusicTrackDto): Observable<MusicTrack> {
    return this.http.post<MusicTrack>(`${this.baseUrl}/tracks/add/${gameSessionId}`, musicTracksDTO);
  }

  removeMusicTrackFromGameSession(gameSessionId: number, musicTrackId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${gameSessionId}/${musicTrackId}`);
  }
}


