import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApplicationUserDto } from '../../../domains/dtos/authentication/ApplicationUserDto';
import { FormBuilder } from '@angular/forms';
import { MemberService } from '../../../services/authentication/member.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { CommonModule } from '@angular/common';
import { HandleDatetimeComponent } from "../../../pipe/handle-datetime/handle-datetime.component";
import { RouterModule } from '@angular/router';
import { TtsStaticsService } from '../../../services/tts-statics/tts-statics.service';
import { TtsVisaService } from '../../../services/tts-visa/tts-visa.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, HandleDatetimeComponent, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  constructor(private _MemberService: MemberService, private _GlobalService: GlobalserviceService,
    private fb: FormBuilder, private cdr: ChangeDetectorRef, private ttssta: TtsStaticsService, private sss: TtsVisaService) { }


  UsersArr!: ApplicationUserDto[]

  async ngOnInit() {
    this.LoadDataList();
    // this.LoadDataTest();
    // this.LoadDataTest2();
  }

  async LoadDataList() {
    this._GlobalService.LoaderLoad(true);
    (await this._MemberService.GetUserList("", "")).subscribe({
      next: (data) => this.UserListSuccess(data),
      error: (error) => { throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

  UserListSuccess(data: ApplicationUserDto[]): void {
    this.UsersArr = data;
  }


  async LoadDataTest() {
    (await this.ttssta.GetTTSCountries()).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

  async LoadDataTest2() {
    (await this.sss.GetVisaTypes(229,229)).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

}
