import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Campaign } from '../model/campaign';
// import { CampaignDTO } from '../model/campaign-dto'; 

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {
  private baseUrl = 'http://localhost:8080/game'; // Update with your Spring Boot backend URL
  userService: any;

  constructor(private http: HttpClient) {}

  createGameSession(gameSessionDTO: gameSessionDTO): Observable<gameSession> {
    console.log('game session:', gameSessionDTO);
    return this.http.post<GameSession>(
      `${this.baseUrl}/create/{campaignId}`,
      gameSessionDTO,
      { withCredentials: true }
    );
  }

  // getAllCampaigns(): Observable<Campaign[]> {

  //   return this.http.get<Campaign[]>(`${this.baseUrl}/campaigns/all`,{ withCredentials: true });
  // }

  // getCampaignById(campaignId: number): Observable<Campaign> {
  //   return this.http.get<Campaign>(`${this.baseUrl}/campaigns/${campaignId}`);
  // }

  // deleteCampaign(campaignId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/campaigns/delete/${campaignId}`);
  // }
}


