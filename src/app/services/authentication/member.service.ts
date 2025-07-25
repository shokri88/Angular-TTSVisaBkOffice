import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from '../../domains/interfaces/IMember';
import { ServerMessage } from '../../domains/models/ServerMessage';
import { TokenService } from '../public/token.service';
import { LocalsettingService } from '../public/localsetting.service';
import { ApplicationUserDto } from '../../domains/dtos/authentication/ApplicationUserDto';
import { CompanyDto } from '../../domains/dtos/authentication/CompanyDto';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient, private _SettingService: LocalsettingService, private _TokenService: TokenService) {
  }

  async LoginUser(_Username: string, _Password: string): Promise<Observable<IMember>> {
    const header = await this._TokenService.GetPublicTokenHeader();
    const Role = "Admin";
    return this.http.get<IMember>(`${this._SettingService.getData("APIUrl")}/Member/LoginUser/${_Username}/${_Password}/${Role}`, { 'headers': header });
  }

  async GetUserList(RoleName?: String, OfficeCode?: string): Promise<Observable<ApplicationUserDto[]>> {
    const header = await this._TokenService.GetUserTokenHeader();
    return this.http.get<ApplicationUserDto[]>(`${this._SettingService.getData("APIUrl")}/Member/GetUserList?RoleName=${RoleName}&OfficeCode=${OfficeCode}`, { 'headers': header });
  }

  async GetCompanyList(): Promise<Observable<CompanyDto[]>> {
    const header = await this._TokenService.GetUserTokenHeader();
    return this.http.get<CompanyDto[]>(`${this._SettingService.getData("APIUrl")}/Member/GetCompanyList`, { 'headers': header });
  }

  async ChangeUserPassword(_Username: string, _OldPassword: string, _NewPassword: string): Promise<Observable<IMember>> {
    const header = await this._TokenService.GetUserTokenHeader();
    return this.http.get<IMember>(`${this._SettingService.getData("APIUrl")}/Member/ChangeUserPassword/${_Username}/${_OldPassword}/${_NewPassword}`, { 'headers': header });
  }

  async RegisterUser(obj: ApplicationUserDto): Promise<Observable<ServerMessage>> {
    const header = await this._TokenService.GetUserTokenHeader();
    const body = JSON.stringify(obj);
    return this.http.post<ServerMessage>(`${this._SettingService.getData("APIUrl")}/Member/RegisterUser`, body, { 'headers': header });
  }

  async GetUser(Id?: string): Promise<Observable<ApplicationUserDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    return this.http.get<ApplicationUserDto>(`${this._SettingService.getData("APIUrl")}/Member/GetUser?Id=${Id}`, { 'headers': header });
  }

  async UpdateUser(obj: ApplicationUserDto): Promise<Observable<ServerMessage>> {
    const header = await this._TokenService.GetUserTokenHeader();
    const body = JSON.stringify(obj);
    return this.http.post<ServerMessage>(`${this._SettingService.getData("APIUrl")}/Member/UpdateUser`, body, { 'headers': header });
  }

}