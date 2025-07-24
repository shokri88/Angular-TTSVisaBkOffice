import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { LocalsettingService } from '../../../services/public/localsetting.service';
import { TtsStaticsService } from '../../../services/tts-statics/tts-statics.service';
import { TtsVisaService } from '../../../services/tts-visa/tts-visa.service';
import { TTSCountryResponseDto } from '../../../domains/dtos/TTSStatics/TTSCountryResponseDto';
import { TTSVisaTypeResponseDto } from '../../../domains/dtos/TTSVisa/TTSVisaTypeResponseDto';
import { NgxCroppedEvent, NgxPhotoEditorModule, NgxPhotoEditorService } from "ngx-photo-editor";
import { TTSProfessionDto } from '../../../domains/dtos/TTSVisa/TTSProfessionDto';

@Component({
  selector: 'app-newvisa',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgxPhotoEditorModule],
  templateUrl: './newvisa.component.html',
  styleUrl: './newvisa.component.css'
})
export class NewvisaComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: NgxPhotoEditorService,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService,
    private _StaticsService: TtsStaticsService, private _VisaService: TtsVisaService) { }


  VisaRegForm!: FormGroup;

  IsShowStatusBox = true;
  IsLoadCountry = false;
  IsLoadProfessions = false;

  CountryDto!: TTSCountryResponseDto
  VisaTypeDto!: TTSVisaTypeResponseDto
  Professions!: TTSProfessionDto[];

  CF_output?: NgxCroppedEvent;
  SD_output?: NgxCroppedEvent;
  DF_output?: NgxCroppedEvent;
  DB_output?: NgxCroppedEvent;
  RT_output?: NgxCroppedEvent;
  TR_output?: NgxCroppedEvent;
  SP_output?: NgxCroppedEvent;
  FP_output?: NgxCroppedEvent;


  ngOnInit(): void {

    // this._GlobalService.LoaderLoad(true);
    this.LoadCountries();
    this.LoadProfession();


    this.VisaRegForm = this.fb.group({
      Nationality: [''], TravellingTo: [''], VisaType: [''], Gender: [''], Martial: [''],
      Language: [''], Religion: [''], PassportType: [''], PassportCountry: [''], BirthCountry: [''],
      PreviousNationality: [''], ComingCountry: [''], MembershipGroup: [''], Profession: [''],
      EnBirthPlace: [''], EnFirstName: [''], EnMiddleName: [''], EnLastName: [''],
      ArBirthPlace: [''], ArFirstName: [''], ArMiddleName: [''], ArLastName: [''],
      EnPassportIssuePlace: [''], EnFatherName: [''], EnMotherName: [''], EnSpouseName: [''],
      ArPassportIssuePlace: [''], ArFatherName: [''], ArMotherName: [''], ArSpouseName: [''],
      PassportIssueDate: [''], PassportExpiryDate: [''], BirthDate: [''], PassportNumber: [''],
      AddressCity: [''], AddressStreet: [''], PhoneNumber: [''], ExpectedEntryDate: [''],
      Remarks: [''], ParentRequest: ['']
    });

  }


  DisableLoader() {
    if (this.IsLoadCountry && this.IsLoadProfessions) {
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


  async LoadProfession() {
    this.Professions = this._SettingService.getProfessions();
    this.IsLoadProfessions = true;
    this.DisableLoader();
  }

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


  //------------------------------------------------------- ATT-----------------------
  FP_FileChangeHandler($event: any) {
    this.service.open($event, {
      imageQuality: 1,
    }).subscribe(data => {
      this.FP_output = data;
    });
  }
  FP_Del() {
    this.FP_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('FP_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  FP_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.FP_output = data;
    });
  }

  async FP_ReadAI() {

  }

  SP_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.SP_output = data;
    });
  }
  SP_Del() {
    this.SP_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('SP_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  SP_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.SP_output = data;
    });
  }

  TR_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.TR_output = data;
    });
  }
  TR_Del() {
    this.TR_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('TR_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  TR_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.TR_output = data;
    });
  }

  CF_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.CF_output = data;
    });
  }
  CF_Del() {
    this.CF_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('CF_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  CF_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.CF_output = data;
    });
  }

  SD_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.SD_output = data;
    });
  }
  SD_Del() {
    this.SD_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('SD_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  SD_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.SD_output = data;
    });
  }

  RT_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.RT_output = data;
    });
  }
  RT_Del() {
    this.RT_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('RT_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  RT_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.RT_output = data;
    });
  }

  DF_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.DF_output = data;
    });
  }
  DF_Del() {
    this.DF_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('DF_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  DF_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.DF_output = data;
    });
  }

  DB_FileChangeHandler($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.DB_output = data;
    });
  }
  DB_Del() {
    this.DB_output = {} as NgxCroppedEvent
    // ریست کردن input فایل
    const fileInput = document.getElementById('DB_File') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // پاک کردن مقدار input
    }
  }
  DB_Edit($event: any) {
    this.service.open($event, {
    }).subscribe(data => {
      this.DB_output = data;
    });
  }

}
