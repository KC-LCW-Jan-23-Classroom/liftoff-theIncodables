import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameSession } from '../model/game-session';
import { GameSessionDto } from '../model/game-session-dto';

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
}


