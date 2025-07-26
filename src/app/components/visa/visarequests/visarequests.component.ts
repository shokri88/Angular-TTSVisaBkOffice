import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { NovaAIService } from '../../../services/nova/nova-ai.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { LocalsettingService } from '../../../services/public/localsetting.service';
import { TtsStaticsService } from '../../../services/tts-statics/tts-statics.service';
import { TtsVisaService } from '../../../services/tts-visa/tts-visa.service';
import { TTSVisaListRequestDto } from '../../../domains/dtos/TTSVisa/Request/TTSVisaListRequestDto';

declare function LoadSelect2(): any;
declare function SelectVisaReqSelectId(SelectId: any, Id: any): any;

@Component({
  selector: 'app-visarequests',
  imports: [],
  templateUrl: './visarequests.component.html',
  styleUrl: './visarequests.component.css'
})
export class VisarequestsComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: NgxPhotoEditorService,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService,
    private _StaticsService: TtsStaticsService, private _VisaService: TtsVisaService, private _NovaAIService: NovaAIService,) { }

  ngOnInit(): void {
    this.Click_LoadVisaList();
  }

  ngAfterViewInit(): void {
    // $('.select2').on('select2:select', function (e: any) {
    LoadSelect2();
    // });
  }

  Click_LoadVisaList() {
    var objReq = {} as TTSVisaListRequestDto;
    this.LoadVisaList(objReq);
  }

  async LoadVisaList(obj: TTSVisaListRequestDto) {
    (await this._VisaService.VisaRequestList(obj)).subscribe({
      next: (data) => {
        // this.VisaTypeDto = data;
        // if (this.VisaTypeDto.response.types.length == 0) {
        //   this._SettingService.ToastMessage('Warning', 'Warning', "No Any Items Found");
        // }
        console.log(data);
      },
      error: (error) => { this._GlobalService.LoaderLoad(false); throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }


}
