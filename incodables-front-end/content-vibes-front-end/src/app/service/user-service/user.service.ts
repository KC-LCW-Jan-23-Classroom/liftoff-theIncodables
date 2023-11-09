import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RegisterDTO } from '../../model/register';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO } from '../../model/login-dto';
import { UserContext } from 'src/app/model/user-context';

@Injectable()
export class UserService {
  private usersUrl: string;
  private loginUrl: string;
  private logoutUrl: string;

  user: any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.loginUrl = 'http://localhost:8080/login';
    this.logoutUrl = 'http://localhost:8080/logout';
  }

  public findAll(): Observable<RegisterDTO[]> {
    return this.http.get<RegisterDTO[]>(this.usersUrl);
  }

  public login(user: LoginDTO): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }
  public logout() {
    return this.http.get(this.logoutUrl);
  }

  public save(user: RegisterDTO) {
    return this.http.post<RegisterDTO>(this.usersUrl, user);
  }

  public getUserId(username: string): Observable<number> {
    return this.http.get<number>(`${this.usersUrl}/id/${username}`);
  }

  public setUserContext(user: any) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('userid', user.id);
  }
  public getUserContext() {
    const user = {
      username: localStorage.getItem('username'),
      id: Number(localStorage.getItem('userid')),
    };
    return user;
  }
}
