import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxCroppedEvent } from 'ngx-photo-editor';
import { Observable } from 'rxjs';
import { NovaPassportDataResponseDto } from '../../domains/dtos/NovaStatics/NovaPassportDataResponseDto';
import { TokenService } from '../public/token.service';
import { NovaTranslateResponseDto } from '../../domains/dtos/NovaStatics/NovaTranslateResponseDto';
import { LocalsettingService } from '../public/localsetting.service';
import { NgxImageCompressService, DOC_ORIENTATION } from "ngx-image-compress";

@Injectable({
  providedIn: 'root'
})
export class NovaAIService {

  constructor(private http: HttpClient, private _SettingService: LocalsettingService, private _TokenService: TokenService,
    private imageCompress: NgxImageCompressService) {
  }

  async compressImage(src: string): Promise<NgxCroppedEvent> {
    if (src.length <= 0)
      return { base64: "" } as NgxCroppedEvent;

    var ratioImage = 100;
    var qualityImage = 100;
    var MaxImageSize = 100000;
    var step = 0;

    do {

      var data = { base64: src } as NgxCroppedEvent;
      if (this.imageCompress.byteCount(data.base64!) > MaxImageSize) {

        if (step % 2 == 0)
          ratioImage -= 1;
        else
          qualityImage -= 1;

        step += 1;

        var _imageCompress = await this.imageCompress
          .compressFile(data!.base64!, DOC_ORIENTATION.Default, ratioImage, qualityImage) // 50% ratio, 50% quality
          .then(async compressedImage => {
            data = { base64: compressedImage } as NgxCroppedEvent;
            return data;
          });

        if (this.imageCompress.byteCount(_imageCompress.base64!) <= MaxImageSize) {
          return _imageCompress;
        }
      }
      else {
        return data;
      }
    } while (true);
    return { base64: "" } as NgxCroppedEvent;;
  }


  async GetTranslateToArabic(Keys: string[]): Promise<Observable<NovaTranslateResponseDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    const body = JSON.stringify(Keys);
    return this.http.post<NovaTranslateResponseDto>(`${this._SettingService.getData("APIUrl")}/NovaVisa/GetTranslateToArabic`, body, { 'headers': header });
  }

  async GetReadPassport(Image: string): Promise<Observable<NovaPassportDataResponseDto>> {
    const header = await this._TokenService.GetUserTokenHeader();
    const body = JSON.stringify(Image);
    return this.http.post<NovaPassportDataResponseDto>(`${this._SettingService.getData("APIUrl")}/NovaVisa/GetReadPassport`, body, { 'headers': header });
  }

 
}
