import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalsettingService } from '../public/localsetting.service';
import { TokenService } from '../public/token.service';
import { TTSCountryResponseDto } from '../../domains/dtos/TTSStatics/TTSCountryResponseDto';

@Injectable({
  providedIn: 'root'
})
export class TtsStaticsService {

  constructor(private http: HttpClient, private _SettingService: LocalsettingService, private _TokenService: TokenService) {
  }

  async GetTTSCountries(): Promise<Observable<TTSCountryResponseDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    return this.http.get<TTSCountryResponseDto>(`${this._SettingService.getData("APIUrl")}/TTSStatics/GetTTSCountries`, { 'headers': header });
  }
}
