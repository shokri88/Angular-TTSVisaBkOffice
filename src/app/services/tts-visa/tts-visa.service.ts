import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalsettingService } from '../public/localsetting.service';
import { TokenService } from '../public/token.service';
import { TTSVisaTypeResponseDto } from '../../domains/dtos/TTSVisa/TTSVisaTypeResponseDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TtsVisaService {

  constructor(private http: HttpClient, private _SettingService: LocalsettingService, private _TokenService: TokenService) {
  }

  async GetVisaTypes(TravellingToId: number, NationalityId: number): Promise<Observable<TTSVisaTypeResponseDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    return this.http.get<TTSVisaTypeResponseDto>(`${this._SettingService.getData("APIUrl")}/TTSVisa/GetVisaTypes/${TravellingToId}/${NationalityId}`, { 'headers': header });
  }

}
