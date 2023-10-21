import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RegisterDTO } from '../../model/register';
import { Observable } from 'rxjs';
import { LoginDTO } from '../../model/login-dto';

@Injectable()
export class UserService {
  private usersUrl: string;
  private loginUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.loginUrl = 'http://localhost:8080/login';
  }

  public findAll(): Observable<RegisterDTO[]> {
    return this.http.get<RegisterDTO[]>(this.usersUrl);
  }


  public findByUsername(user: LoginDTO):Observable<any> {
    return this.http.post(this.loginUrl, user);
  }

  public save(user: RegisterDTO) {
    return this.http.post<RegisterDTO>(this.usersUrl, user);
  }
}
