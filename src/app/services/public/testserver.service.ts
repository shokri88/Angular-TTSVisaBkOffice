import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalsettingService } from './localsetting.service';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { ServerMessage } from '../../domains/models/ServerMessage';

@Injectable({
  providedIn: 'root'
})
export class TestserverService {

   constructor(private http: HttpClient, private _SettingService: LocalsettingService, private _TokenService: TokenService) {
  }

  async GetTest(): Promise<Observable<ServerMessage>> {
    return this.http.get<ServerMessage>(`${this._SettingService.getData("APIUrl")}/Server/Test`);
  }
}
