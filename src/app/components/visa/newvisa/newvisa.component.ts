import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { NovaAIService } from '../../../services/nova/nova-ai.service';
import { NovaPassportDataDto } from '../../../domains/dtos/NovaStatics/NovaPassportDataResponseDto';

declare function LoadSelect2(): any;
declare function SelectVisaReqSelectId(SelectId: any, Id: any): any;

@Component({
  selector: 'app-newvisa',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgxPhotoEditorModule],
  templateUrl: './newvisa.component.html',
  styleUrl: './newvisa.component.css'
})
export class NewvisaComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: NgxPhotoEditorService,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService,
    private _StaticsService: TtsStaticsService, private _VisaService: TtsVisaService, private _NovaAIService: NovaAIService,) { }


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

    this._GlobalService.LoaderLoad(true);
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

  ngAfterViewInit(): void {
    // $('.select2').on('select2:select', function (e: any) {
    LoadSelect2();
    // });
  }

  DisableLoader() {
    if (this.IsLoadCountry && this.IsLoadProfessions) {
      this._GlobalService.LoaderLoad(false);
    }
  }

  Click_LoadVisaType() {
    var NationalityId = (<HTMLInputElement>document.getElementById("Nationality")).value;
    var TravellingToId = (<HTMLInputElement>document.getElementById("TravellingTo")).value;

    if (NationalityId != '' && TravellingToId != '') {
      this._GlobalService.LoaderLoad(true);
      this.LoadVisaType(Number(TravellingToId), Number(NationalityId));
    } else {
      this._SettingService.ToastMessage('Warning', 'Required Field', "Select Nationality & Travelling To");
    }
  }

  SaveToDraft() {

  }




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
        LoadSelect2();
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
    this._GlobalService.LoaderLoad(true);
    (await this._NovaAIService.GetReadPassport(this.FP_output?.base64!)).subscribe({
      next: (data) => {
        this.LoadReadPassport(data.data!);
        if (!data.success)
          this._SettingService.ToastMessage("Error", "Server Error", data.errorCode);
      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

  LoadReadPassport(data: NovaPassportDataDto) {

    console.log(data);

    this._SettingService.ToastMessage("Success", "Read Passport", "Passport Read Successfully");
    this.FP_output = { base64: data!.passportPage0 } as NgxCroppedEvent
    this.TR_output = { base64: data!.portrait } as NgxCroppedEvent

    // SelectVisaReqSelectId("Nationality", data!.nationalityId);
    // SelectVisaReqSelectId("BirthCountry", data!.birthCountryId);
    SelectVisaReqSelectId("Martial", data!.maritalStatus);
    SelectVisaReqSelectId("PassportType", data!.passportType);
    // SelectVisaReqSelectId("PreviousNationality", data!.previousNationalityId);
    // SelectVisaReqSelectId("GroupMemebership", data!.membershipGroupId);
    // SelectVisaReqSelectId("Profession", data!.professionId);
    // SelectVisaReqSelectId("Language", data!.languageId);
    // SelectVisaReqSelectId("Religion", data!.religionId);
    // SelectVisaReqSelectId("PassportCountry", data!.passportIssuingCountryId);
    // SelectVisaReqSelectId("ComingCountry", data!.passportIssuingCountryId);

    if (data!.gender == "M")
      SelectVisaReqSelectId("Gender", "1");
    else if (data!.gender == "F")
      SelectVisaReqSelectId("Gender", "2");

    var ctrl = this.VisaRegForm.controls;
    ctrl['EnBirthPlace'].setValue(data!.birthPlace);
    ctrl['EnFirstName'].setValue(data!.firstName);
    ctrl['EnMiddleName'].setValue(data!.middleName);
    ctrl['EnLastName'].setValue(data!.lastName);
    ctrl['EnPassportIssuePlace'].setValue(data!.passportIssuePlace);
    ctrl['EnFatherName'].setValue(data!.fatherName);
    ctrl['EnMotherName'].setValue(data!.motherName);
    ctrl['EnSpouseName'].setValue(data!.husbandName);

    ctrl['ArBirthPlace'].setValue(data!.arabicBirthPlace);
    ctrl['ArFirstName'].setValue(data!.arabicFirstName);
    ctrl['ArMiddleName'].setValue(data!.arabicMiddleName);
    ctrl['ArLastName'].setValue(data!.arabicLastName);
    ctrl['ArPassportIssuePlace'].setValue(data!.arabicPassportIssuePlace);
    ctrl['ArFatherName'].setValue(data!.arabicFatherName);
    ctrl['ArMotherName'].setValue(data!.arabicMotherName);
    ctrl['ArSpouseName'].setValue(data!.arabicHusbandName);

    ctrl['BirthDate'].setValue(data!.birthDate);
    ctrl['PassportIssueDate'].setValue(data!.passportIssueDate);
    ctrl['PassportExpiryDate'].setValue(data!.passportExpiryDate);
    ctrl['PassportNumber'].setValue(data!.passportNumber);
    ctrl['ExpectedEntryDate'].setValue(data!.expectedEntry);
    ctrl['AddressCity'].setValue(data!.addressCity);
    ctrl['AddressStreet'].setValue(data!.addressStreet);

    LoadSelect2();
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
