import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../model/campaign';
import { CampaignDTO } from '../model/campaign-dto'; 

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private baseUrl = 'http://localhost:8080'; // Update with your Spring Boot backend URL
  userService: any;

  constructor(private http: HttpClient) {}

  createCampaign(campaignDTO: CampaignDTO): Observable<Campaign> {
    console.log('campaign dto', campaignDTO);
    return this.http.post<Campaign>(
      `${this.baseUrl}/campaigns/create`,
      campaignDTO,
      { withCredentials: true }
    );
  }

  getAllCampaigns(): Observable<Campaign[]> {

    return this.http.get<Campaign[]>(`${this.baseUrl}/campaigns/all`,{ withCredentials: true });
  }

  getCampaignById(campaignId: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.baseUrl}/campaigns/${campaignId},`, {withCredentials:true});
  }

  deleteCampaign(campaignId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/campaigns/delete/${campaignId}`, {withCredentials:true});
  }
}










// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CampaignDTO } from '../model/campaign-dto';
// import { UserService } from './user-service/user.service';

// @Injectable()
// export class CampaignService {

//   private baseUrl = 'http://localhost:8080/campaigns'; // Replace with your Spring Boot API URL

//   constructor(private http: HttpClient, private userService: UserService) {}


//   getAllCampaigns(): Observable<CampaignDTO[]> {
//     const getAllCampaignUrl = `${this.baseUrl}/all`;

//     return this.http.get<CampaignDTO[]>(getAllCampaignUrl);
//   }
  
//   getCampaignById(campaignId: number): Observable<CampaignDTO> {
//     const getCampaignByIdUrl = `${this.baseUrl}/${campaignId}`;
//     return this.http.get<CampaignDTO>(getCampaignByIdUrl);
//   }

//   createCampaign(campaign: CampaignDTO): Observable<CampaignDTO> {
//     const createCampaignUrl = `${this.baseUrl}/create`;
//     return this.http.post<CampaignDTO>(createCampaignUrl, campaign);
//   }

//   deleteCampaign(campaignId: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${campaignId}`);
//   }

// }
