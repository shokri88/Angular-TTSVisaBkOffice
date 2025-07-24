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
import { VisaRequestValidator } from '../../../domains/models/VisaRequestValidator';
import { TTSSaveVisaRequestDto } from '../../../domains/dtos/TTSVisa/Request/TTSSaveVisaRequestDto';

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

  ReqData!: VisaRequestValidator[]


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

  async SaveToDraft() {
    if (this.ValidateForm()) {

      var obj = this.ReqData.find(x => x.Name === "VisaType");
      if (obj?.Value.length! > 0) {

        this._GlobalService.LoaderLoad(true);

        var objVisaType = this.VisaTypeDto.response.types!.find(x => x.visaTypeId == Number(obj?.Value));

        var modal = <TTSSaveVisaRequestDto>{};
        modal.nationalityId = this.ReqData.find(x => x.Name === "Nationality")?.Value!;
        modal.birthCountryId = this.ReqData.find(x => x.Name === "BirthCountry")?.Value!;
        modal.birthDate = this.ReqData.find(x => x.Name === "BirthDate")?.Value!;
        modal.gender = this.ReqData.find(x => x.Name === "Gender")?.Value!;
        modal.maritalStatus = this.ReqData.find(x => x.Name === "Martial")?.Value!;
        modal.passportIssuingCountryId = this.ReqData.find(x => x.Name === "PassportCountry")?.Value!;
        modal.passportNumber = this.ReqData.find(x => x.Name === "PassportNumber")?.Value!;
        modal.passportIssueDate = this.ReqData.find(x => x.Name === "PassportIssueDate")?.Value!;
        modal.passportExpiryDate = this.ReqData.find(x => x.Name === "PassportExpiryDate")?.Value!;
        modal.applicantAccountId = this.ReqData.find(x => x.Name === "Applicant")?.Value!;
        modal.firstName = this.ReqData.find(x => x.Name === "EnFirstName")?.Value!;
        modal.arabicFirstName = this.ReqData.find(x => x.Name === "ArFirstName")?.Value!;
        modal.middleName = this.ReqData.find(x => x.Name === "EnMiddleName")?.Value!;
        modal.arabicMiddleName = this.ReqData.find(x => x.Name === "ArMiddleName")?.Value!;
        modal.lastName = this.ReqData.find(x => x.Name === "EnLastName")?.Value!;
        modal.arabicLastName = this.ReqData.find(x => x.Name === "ArLastName")?.Value!;
        modal.fatherName = this.ReqData.find(x => x.Name === "EnFatherName")?.Value!;
        modal.arabicFatherName = this.ReqData.find(x => x.Name === "ArFatherName")?.Value!;
        modal.motherName = this.ReqData.find(x => x.Name === "EnMotherName")?.Value!;
        modal.arabicMotherName = this.ReqData.find(x => x.Name === "ArMotherName")?.Value!;
        modal.husbandName = this.ReqData.find(x => x.Name === "EnSpouseName")?.Value!;
        modal.arabicHusbandName = this.ReqData.find(x => x.Name === "ArSpouseName")?.Value!;
        modal.passportIssuePlace = this.ReqData.find(x => x.Name === "EnPassportIssuePlace")?.Value!;
        modal.arabicPassportIssuePlace = this.ReqData.find(x => x.Name === "ArPassportIssuePlace")?.Value!;
        modal.birthPlace = this.ReqData.find(x => x.Name === "EnBirthPlace")?.Value!;
        modal.arabicBirthPlace = this.ReqData.find(x => x.Name === "ArBirthPlace")?.Value!;
        modal.passportType = this.ReqData.find(x => x.Name === "PassportType")?.Value!;
        modal.previousNationalityId = this.ReqData.find(x => x.Name === "PreviousNationality")?.Value!;
        modal.membershipGroupId = this.ReqData.find(x => x.Name === "GroupMemebership")?.Value!;
        modal.professionId = this.ReqData.find(x => x.Name === "Profession")?.Value!;
        modal.addressCountryId = this.ReqData.find(x => x.Name === "PassportCountry")?.Value!;
        modal.addressCity = this.ReqData.find(x => x.Name === "AddressCity")?.Value!;
        modal.addressStreet = this.ReqData.find(x => x.Name === "AddressStreet")?.Value!;
        modal.phoneNumber = this.ReqData.find(x => x.Name === "PhoneNumber")?.Value!;
        modal.uIDNumber = null;
        modal.expectedTripDate = this.ReqData.find(x => x.Name === "ExpectedEntryDate")?.Value!;
        modal.referenceNumber = null
        modal.requestRemarks = this.ReqData.find(x => x.Name === "Remarks")?.Value!;
        modal.comingFromCountryId = this.ReqData.find(x => x.Name === "ComingCountry")?.Value!;
        modal.languageId = this.ReqData.find(x => x.Name === "Language")?.Value!;
        modal.parentRequestId = "";//////////
        modal.holdRequest = "1"
        modal.religionId = this.ReqData.find(x => x.Name === "Religion")?.Value!;

        this.FP_output = this.FP_output?.base64 ? (await this._NovaAIService.compressImage(this.FP_output?.base64!)) : ({} as NgxCroppedEvent);
        this.SP_output = this.SP_output?.base64 ? (await this._NovaAIService.compressImage(this.SP_output?.base64!)) : ({} as NgxCroppedEvent);
        this.TR_output = this.TR_output?.base64 ? (await this._NovaAIService.compressImage(this.TR_output?.base64!)) : ({} as NgxCroppedEvent);
        this.CF_output = this.CF_output?.base64 ? (await this._NovaAIService.compressImage(this.CF_output?.base64!)) : ({} as NgxCroppedEvent);
        // this.CB_output = this.CB_output?.base64 ? (await this._NovaAIService.compressImage(this.CB_output?.base64!)) : ({} as NgxCroppedEvent);
        this.DF_output = this.DF_output?.base64 ? (await this._NovaAIService.compressImage(this.DF_output?.base64!)) : ({} as NgxCroppedEvent);
        this.DB_output = this.DB_output?.base64 ? (await this._NovaAIService.compressImage(this.DB_output?.base64!)) : ({} as NgxCroppedEvent);


        modal.portrait = this.TR_output?.base64!;
        modal.passportPage1 = this.FP_output?.base64!;
        modal.passportPage2 = this.SP_output?.base64!;
        modal.nationalIDCardFront = this.CF_output?.base64!;
        // modal.nationalIDCardBack = this.CB_output?.base64!;
        modal.additionalDocument1 = this.DF_output?.base64!;
        modal.additionalDocument2 = this.DB_output?.base64!;

        // if (this.UpdateReqId == 0) {
        //   this.SendSaveRequestToServer(modal!);
        // }
        // else {
        //   var UpdateModel = JSON.parse(JSON.stringify(modal)) as NovaUpdateVisaRequestDto;

        //   UpdateModel.RequestId = String(this.UpdateReqId);
        //   this.SendUpdateRequestToServer(UpdateModel);
        // }

        console.log(modal);

      }

    }
  }

  ValidateForm(): boolean {

    var IsValid: boolean = true;
    var IsValidAttachments: boolean = true;
    var Alert: string = "";
    var AlertAttachments: string = "";
    var ctrl = this.VisaRegForm.controls;

    this.ReqData = [
      { Title: "Passport Issue Date", Name: "PassportIssueDate", Value: ctrl['PassportIssueDate'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 4, IsReq: true },
      { Title: "Passport Expiry Date", Name: "PassportExpiryDate", Value: ctrl['PassportExpiryDate'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 5, IsReq: true },
      { Title: "Birth Date", Name: "BirthDate", Value: ctrl['BirthDate'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 6, IsReq: true },
      { Title: "Passport Number", Name: "PassportNumber", Value: ctrl['PassportNumber'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 9, IsReq: true },
      { Title: "EN Birth Place", Name: "EnBirthPlace", Value: ctrl['EnBirthPlace'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 10, IsReq: true },
      { Title: "AR Birth Place", Name: "ArBirthPlace", Value: ctrl['ArBirthPlace'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 11, IsReq: true },
      { Title: "EN FirstName", Name: "EnFirstName", Value: ctrl['EnFirstName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 12, IsReq: true },
      { Title: "ARFirstName", Name: "ArFirstName", Value: ctrl['ArFirstName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 13, IsReq: true },
      { Title: "EN Middle Name", Name: "EnMiddleName", Value: ctrl['EnMiddleName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 14, IsReq: false },
      { Title: "AR Middle Name", Name: "ArMiddleName", Value: ctrl['ArMiddleName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 15, IsReq: false },
      { Title: "EN Last Name", Name: "EnLastName", Value: ctrl['EnLastName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 16, IsReq: true },
      { Title: "AR Last Name", Name: "ArLastName", Value: ctrl['ArLastName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 17, IsReq: true },
      { Title: "EN Passport Issue Place", Name: "EnPassportIssuePlace", Value: ctrl['EnPassportIssuePlace'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 18, IsReq: true },
      { Title: "AR Passport Issue Place", Name: "ArPassportIssuePlace", Value: ctrl['ArPassportIssuePlace'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 19, IsReq: true },
      { Title: "EN Father Name", Name: "EnFatherName", Value: ctrl['EnFatherName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 20, IsReq: true },
      { Title: "AR Father Name", Name: "ArFatherName", Value: ctrl['ArFatherName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 21, IsReq: true },
      { Title: "EN Mother Name", Name: "EnMotherName", Value: ctrl['EnMotherName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 22, IsReq: true },
      { Title: "AR Mother Name", Name: "ArMotherName", Value: ctrl['ArMotherName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 23, IsReq: true },
      { Title: "EN Spouse Name", Name: "EnSpouseName", Value: ctrl['EnSpouseName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 24, IsReq: false },
      { Title: "AR Spouse Name", Name: "ArSpouseName", Value: ctrl['ArSpouseName'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 25, IsReq: false },
      { Title: "Address City", Name: "AddressCity", Value: ctrl['AddressCity'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 27, IsReq: true },
      { Title: "Address Street", Name: "AddressStreet", Value: ctrl['AddressStreet'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 28, IsReq: true },
      { Title: "Phone Number", Name: "PhoneNumber", Value: ctrl['PhoneNumber'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 34, IsReq: true },
      { Title: "Expected Entry Date", Name: "ExpectedEntryDate", Value: ctrl['ExpectedEntryDate'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 37, IsReq: true },
      { Title: "Remarks", Name: "Remarks", Value: ctrl['Remarks'].value, IsInput: true, IsSelect: false, IsImage: false, Index: 40, IsReq: false },
      { Title: "Visa Type", Name: "VisaType", Value: (<HTMLInputElement>document.getElementById("VisaType")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 1, IsReq: true },
      { Title: "Applicant", Name: "Applicant", Value: (<HTMLInputElement>document.getElementById("Applicant")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 2, IsReq: true },
      { Title: "Nationality", Name: "Nationality", Value: (<HTMLInputElement>document.getElementById("Nationality")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 3, IsReq: true },
      { Title: "Gender", Name: "Gender", Value: (<HTMLInputElement>document.getElementById("Gender")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 7, IsReq: true },
      { Title: "Martial", Name: "Martial", Value: (<HTMLInputElement>document.getElementById("Martial")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 8, IsReq: true },
      { Title: "Passport Country", Name: "PassportCountry", Value: (<HTMLInputElement>document.getElementById("PassportCountry")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 26, IsReq: true },
      { Title: "Birth Country", Name: "BirthCountry", Value: (<HTMLInputElement>document.getElementById("BirthCountry")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 29, IsReq: true },
      { Title: "Group Memebership", Name: "GroupMemebership", Value: (<HTMLInputElement>document.getElementById("GroupMemebership")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 30, IsReq: true },
      { Title: "Language", Name: "Language", Value: (<HTMLInputElement>document.getElementById("Language")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 31, IsReq: true },
      { Title: "Profession", Name: "Profession", Value: (<HTMLInputElement>document.getElementById("Profession")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 32, IsReq: true },
      { Title: "Religion", Name: "Religion", Value: (<HTMLInputElement>document.getElementById("Religion")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 33, IsReq: true },
      { Title: "Previous Nationality", Name: "PreviousNationality", Value: (<HTMLInputElement>document.getElementById("PreviousNationality")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 35, IsReq: true },
      { Title: "Passport Type", Name: "PassportType", Value: (<HTMLInputElement>document.getElementById("PassportType")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 36, IsReq: true },
      { Title: "Coming From Country", Name: "ComingCountry", Value: (<HTMLInputElement>document.getElementById("ComingCountry")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 38, IsReq: true },
      // { Title: "Reason of Travel", Name: "ReasonTravel", Value: (<HTMLInputElement>document.getElementById("ReasonTravel")).value, IsInput: false, IsSelect: true, IsImage: false, Index: 39, IsReq: true },
    ];


    for (let item of this.ReqData.sort(x => x.Index)) {
      if (item.Value == "" && item.IsReq == true && item.IsInput) {
        Alert += `${item.Title} is required <br/>`
        IsValid = false;
      }
      if (item.Value == "" && item.IsReq == true && item.IsSelect) {
        Alert += `${item.Title} is not selected <br/>`
        IsValid = false;
      }
    }

    if (!IsValid) {
      this._SettingService.ToastMessage("Warning", "Warning Details", Alert);
    }

    if (IsValid && IsValidAttachments) {
      return true;
    }
    else {
      return false;
    }
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
