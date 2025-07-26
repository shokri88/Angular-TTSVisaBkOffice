import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxPhotoEditorModule, NgxPhotoEditorService } from 'ngx-photo-editor';
import { NovaAIService } from '../../../services/nova/nova-ai.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { LocalsettingService } from '../../../services/public/localsetting.service';
import { TtsStaticsService } from '../../../services/tts-statics/tts-statics.service';
import { TtsVisaService } from '../../../services/tts-visa/tts-visa.service';
import { TTSVisaListRequestDto } from '../../../domains/dtos/TTSVisa/Request/TTSVisaListRequestDto';
import { CommonModule } from '@angular/common';
import { TTSCountryResponseDto, TTSCountryResponseBodyDto } from '../../../domains/dtos/TTSStatics/TTSCountryResponseDto';
import { TTSVisaTypeResponseDto } from '../../../domains/dtos/TTSVisa/TTSVisaTypeResponseDto';
import { TTSVisaListRequest, TTSVisaListResponseDto } from '../../../domains/dtos/TTSVisa/TTSVisaListResponseDto';
import { HandleToDateComponent } from '../../../pipe/handle-to-date/handle-to-date.component';
import { HandleDateComponent } from '../../../pipe/handle-date/handle-date.component';
import { NgxPaginationModule } from 'ngx-pagination';

declare function LoadSelect2(): any;
declare function SelectVisaReqSelectId(SelectId: any, Id: any): any;

@Component({
  selector: 'app-visarequests',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,
    NgxPhotoEditorModule, HandleDateComponent, HandleToDateComponent,
    NgxPaginationModule],
  templateUrl: './visarequests.component.html',
  styleUrl: './visarequests.component.css'
})
export class VisarequestsComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: NgxPhotoEditorService,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService,
    private _StaticsService: TtsStaticsService, private _VisaService: TtsVisaService, private _NovaAIService: NovaAIService,) { }

  VisaSearchForm!: FormGroup;

  CountryDto!: TTSCountryResponseDto
  VisaTypeDto!: TTSVisaTypeResponseDto
  VisaReqList!: TTSVisaListResponseDto

  IsLoadCountry = false;

  RequestId: string = "";

  PageNumber: number = 1;
  PageCountItems: any[] = []; // لیست داده‌ها
  RecordsPerPage: number = 20; // تعداد آیتم‌ها در هر صفحه
  totalItems: number = 0; // تعداد کل آیتم‌ها



  ngOnInit(): void {
    this.CountryDto = {} as TTSCountryResponseDto;
    this.CountryDto.response = {} as TTSCountryResponseBodyDto;
    this.CountryDto.response.countries = [];

    const routeParams = this.route.snapshot.paramMap;
    this.RequestId = routeParams.get('id') ?? "";
    this.ReloadForm();
  }


  ReloadForm() {

    this._GlobalService.LoaderLoad(true);

    (<HTMLInputElement>document.getElementById("StartDate")).value = "";
    (<HTMLInputElement>document.getElementById("EndDate")).value = "";

    this.VisaSearchForm = this.fb.group({
      Nationality: [''], TravellingTo: [''],
      PassportNumber: [''], PassengerName: [''], RequestNumber: [this.RequestId]
    });
    this.LoadCountries();
  }

  ClearForm() {
    window.location.href = `/visa/visarequests`;
  }


  ngAfterViewInit(): void {
    // $('.select2').on('select2:select', function (e: any) {
    LoadSelect2();
    // });
  }

  async LoadCountries() {
    (await this._StaticsService.GetTTSCountries()).subscribe({
      next: (data) => {
        this.CountryDto = data;
      },
      error: (error) => { this._GlobalService.LoaderLoad(false); throw new Error(error); },
      complete: () => {
        this.IsLoadCountry = true;
        this.DisableLoader();
      }
    });
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

  async LoadVisaType(TravellingToId: number, NationalityId: number) {
    (await this._VisaService.GetVisaTypes(TravellingToId, NationalityId)).subscribe({
      next: (data) => {
        this.VisaTypeDto = data;
        if (this.VisaTypeDto.response.types.length == 0) {
          this._SettingService.ToastMessage('Warning', 'Warning', "No Any Items Found");
        }
      },
      error: (error) => { this._GlobalService.LoaderLoad(false); throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
        LoadSelect2();
      }
    });
  }

  DisableLoader() {
    if (this.IsLoadCountry) {
      this._GlobalService.LoaderLoad(false);

      if (this.RequestId != "") {
        this.SearchVisa("");
      }
    }
  }


  async LoadVisaList(obj: TTSVisaListRequestDto) {
    (await this._VisaService.VisaRequestList(obj)).subscribe({
      next: (data) => {
        this.VisaReqList = data;
        if (this.VisaReqList.response.totalRecords == 0) {
          this._SettingService.ToastMessage('Warning', 'Warning', "No Any Items Found");
        }
        else if (!this.VisaReqList.success) {
          this._SettingService.ToastMessage('Error', 'Error', this.VisaTypeDto.error.detail);
        }
        else {
          this.PageCountItems = Array.from({ length: this.VisaReqList.response.totalRecords }, (_, i) => ({ id: i + 1, name: `item ${i + 1}` }));
          this.totalItems = this.VisaReqList.response.totalRecords;
        }
        console.log(data);
      },
      error: (error) => { this._GlobalService.LoaderLoad(false); throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

  SearchVisa(FilterStatus: string) {
    this._GlobalService.LoaderLoad(true);
    var objReq = {} as TTSVisaListRequestDto;

    var VisaStatus = FilterStatus.length > 0 ? FilterStatus : (<HTMLInputElement>document.getElementById("VisaStatus")).value
    var StartDate = (<HTMLInputElement>document.getElementById("StartDate")).value;
    var EndDate = (<HTMLInputElement>document.getElementById("EndDate")).value;

    var ctrl = this.VisaSearchForm.controls;
    objReq.passengerNameLike = String(ctrl["PassengerName"].value).length > 0 ? ctrl["PassengerName"].value : null;
    objReq.requestId = String(ctrl["RequestNumber"].value).length > 0 ? ctrl["RequestNumber"].value : null;
    objReq.passportNumberLike = String(ctrl["PassportNumber"].value).length > 0 ? ctrl["PassportNumber"].value : null;

    objReq.startDate = StartDate == "" ? null : StartDate;
    objReq.endDate = EndDate == "" ? null : EndDate;
    objReq.status = VisaStatus == "0" ? [] : [VisaStatus];

    objReq.pageNumber = this.PageNumber;
    objReq.recordPerPage = this.RecordsPerPage;
    objReq.sortBy = "ID";

    if ((<HTMLInputElement>document.getElementById("VisaType")) == null) {
      objReq.visaTypeId = null;
    }
    else {
      objReq.visaTypeId = (<HTMLInputElement>document.getElementById("VisaType")).value;
    }

    this.LoadVisaList(objReq);
  }

  get visaDataArray(): TTSVisaListRequest[] {
    return Object.values(this.VisaReqList.response.data);
  }

  onChangePage(page: number) {
    if (page != this.PageNumber) {
      this.PageNumber = page;
      this.SearchVisa("");
    }
  }

}
