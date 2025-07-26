import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalsettingService } from '../public/localsetting.service';
import { TokenService } from '../public/token.service';
import { TTSVisaTypeResponseDto } from '../../domains/dtos/TTSVisa/TTSVisaTypeResponseDto';
import { Observable } from 'rxjs';
import { TTSSaveVisaRequestDto } from '../../domains/dtos/TTSVisa/Request/TTSSaveVisaRequestDto';
import { TTSSaveVisaResponseDto } from '../../domains/dtos/TTSVisa/TTSSaveVisaResponseDto';
import { TTSVisaListResponseDto } from '../../domains/dtos/TTSVisa/TTSVisaListResponseDto';
import { TTSVisaListRequestDto } from '../../domains/dtos/TTSVisa/Request/TTSVisaListRequestDto';


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

  async SaveVisaRequest(obj: TTSSaveVisaRequestDto): Promise<Observable<TTSSaveVisaResponseDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    const body = JSON.stringify(obj);
    return this.http.post<TTSSaveVisaResponseDto>(`${this._SettingService.getData("APIUrl")}/TTSVisa/SaveVisaRequest`, body, { 'headers': header });
  }

  async VisaRequestList(obj: TTSVisaListRequestDto): Promise<Observable<TTSVisaListResponseDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    const body = JSON.stringify(obj);
    return this.http.post<TTSVisaListResponseDto>(`${this._SettingService.getData("APIUrl")}/TTSVisa/VisaRequestList`, body, { 'headers': header });
  }

}
