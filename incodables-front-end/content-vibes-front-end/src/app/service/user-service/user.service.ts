import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RegisterDTO } from '../../model/register';
import { Observable } from 'rxjs';
import { LoginDTO } from '../../model/login-dto';
import { UserModel } from 'src/app/model/user-model';

@Injectable()
export class UserService {
  private usersUrl: string;
  private loginUrl: string;
  private logoutUrl: string;
  private user: any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.loginUrl = 'http://localhost:8080/login';
    this.logoutUrl = 'http://localhost:8080/users/logout';
  }

  public findAll(): Observable<RegisterDTO[]> {
    return this.http.get<RegisterDTO[]>(this.usersUrl);
  }

  public login(user: LoginDTO): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http.post(this.loginUrl, user, httpOptions);
  }

  public save(user: RegisterDTO) {
    return this.http.post<RegisterDTO>(this.usersUrl, user);
  }

  public setUserInfo(user: UserModel) {
    localStorage.setItem('username', user.username);
  }

  public getUserInfo() {
    let username = localStorage.getItem('username');
    return username;
  }

  public discardUserInfo() {
    localStorage.removeItem('username');
  }

  public logout(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http.get(this.logoutUrl, httpOptions);
  }
}
