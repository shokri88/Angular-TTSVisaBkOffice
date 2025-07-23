import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MemberService } from '../../../services/authentication/member.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { LocalsettingService } from '../../../services/public/localsetting.service';
import { TtsStaticsService } from '../../../services/tts-statics/tts-statics.service';
import { TtsVisaService } from '../../../services/tts-visa/tts-visa.service';
import { TTSCountryResponseDto } from '../../../domains/dtos/TTSStatics/TTSCountryResponseDto';
import { TTSVisaTypeResponseDto } from '../../../domains/dtos/TTSVisa/TTSVisaTypeResponseDto';

@Component({
  selector: 'app-newvisa',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './newvisa.component.html',
  styleUrl: './newvisa.component.css'
})
export class NewvisaComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService,
    private _StaticsService: TtsStaticsService, private _VisaService: TtsVisaService) { }

  VisaRegForm!: FormGroup;

  IsShowStatusBox = true;
  IsLoadCountry = false;


  CountryDto!: TTSCountryResponseDto
  VisaTypeDto!: TTSVisaTypeResponseDto


  ngOnInit(): void {

    // this._GlobalService.LoaderLoad(true);
    // this.LoadCountries();


    this.VisaRegForm = this.fb.group({
      Nationality: [''], TravellingTo: [''], VisaType: [''], Gender: [''], Martial: [''],
      Language: [''], Religion: [''], PassportType: [''], PassportCountry: [''], BirthCountry: [''],
      PreviousNationality: [''], ComingCountry: [''], MembershipGroup: [''],
      EnBirthPlace: [''], EnFirstName: [''], EnMiddleName: [''], EnLastName: [''],
      ArBirthPlace: [''], ArFirstName: [''], ArMiddleName: [''], ArLastName: [''],
      EnPassportIssuePlace: [''], EnFatherName: [''], EnMotherName: [''], EnSpouseName: [''],
      ArPassportIssuePlace: [''], ArFatherName: [''], ArMotherName: [''], ArSpouseName: [''],
      PassportIssueDate: [''], PassportExpiryDate: [''], BirthDate: [''], PassportNumber: [''],
      AddressCity: [''], AddressStreet: [''], PhoneNumber: [''], ExpectedEntryDate: [''],
      Remarks: [''],ParentRequest:['']
    });

  }


  DisableLoader() {
    if (this.IsLoadCountry) {
      this._GlobalService.LoaderLoad(false);
    }
  }

  Click_LoadVisaType() {
    var NationalityId = this.VisaRegForm.controls['Nationality'].value;
    var TravellingToId = this.VisaRegForm.controls['TravellingTo'].value;
    if (NationalityId != '' && NationalityId != '') {
      this._GlobalService.LoaderLoad(true);
      this.LoadVisaType(TravellingToId, NationalityId);
    } else {
      this._SettingService.ToastMessage('Warning', 'Required Field', "Select Nationality & Travelling To");
    }
  }

  SaveToDraft() {

  }

  CallTranslate() { }



  async LoadCountries() {
    (await this._StaticsService.GetTTSCountries()).subscribe({
      next: (data) => {
        this.CountryDto = data;
      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this.IsLoadCountry = true;
        this.DisableLoader();
      }
    });
  }

  async LoadVisaType(TravellingToId: number, NationalityId: number) {
    (await this._VisaService.GetVisaTypes(TravellingToId, NationalityId)).subscribe({
      next: (data) => {
        this.VisaTypeDto = data;
        if (this.VisaTypeDto.response.types.length == 0) {
          this._SettingService.ToastMessage('Warning', 'Warning', "No Any Items Found");
        }

      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

}
