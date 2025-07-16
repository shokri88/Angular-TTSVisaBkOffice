import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { LocalsettingService } from './localsetting.service';
import { LocalStorageService } from './localstorage.service';
import { Token } from '../../domains/models/Token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   constructor(private http: HttpClient, private _SettingService: LocalsettingService, private _LocalStorageService: LocalStorageService) {
  }

  private GetPublic(): Observable<Token> {
    const ExApiUsername = this._SettingService.getData("ExApiUsername");
    const ExApiPassword = this._SettingService.getData("ExApiPassword");
    return this.http.get<Token>(`${this._SettingService.getData("APIUrl")}/Token/GetPublicToken?UserName=${ExApiUsername}&Password=${ExApiPassword}`);
  }

  GetUserToken(): Observable<Token> {
    const ExApiUsername = this._SettingService.getData("ExApiUsername");
    const ExApiPassword = this._SettingService.getData("ExApiPassword");
    const UserId = this._LocalStorageService.GetFromLocalStorage().id;
    const UserPassword = this._LocalStorageService.GetFromLocalStorage().password.replaceAll("+", "%2B");
    var ss = `${this._SettingService.getData("APIUrl")}/Token/GetUserToken?UserName=${ExApiUsername}&Password=${ExApiPassword}&UserId=${UserId}&UserPassword=${UserPassword}`;
    return this.http.get<Token>(ss);
  }

  async GetPublicTokenHeader(): Promise<HttpHeaders> {
    const token$ = this.GetPublic();
    const lasttoken = await lastValueFrom(token$);
    return new HttpHeaders({ 'content-type': 'application/json', 'Authorization': `Bearer ${lasttoken.token}` });
  }

  async GetUserTokenHeader(): Promise<HttpHeaders> {
    const token$ = this.GetUserToken();
    const lasttoken = await lastValueFrom(token$);
    return new HttpHeaders({ 'content-type': 'application/json', 'Authorization': `Bearer ${lasttoken.token}` });
  }
}
