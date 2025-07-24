import { Injectable } from '@angular/core';
import { ISetting } from '../../domains/interfaces/ISetting';
import *  as  SettingJson from '../../SettingData.json';
import *  as  ProfessionsJson from '../../Professions.json';
import { ToastrService } from 'ngx-toastr';
import { TTSProfessionDto } from '../../domains/dtos/TTSVisa/TTSProfessionDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


interface Settings {
  [key: string]: string; // فرض می‌کنیم همه مقادیر رشته هستند
}

@Injectable({
  providedIn: 'root'
})
export class LocalsettingService {

  constructor(private toastr: ToastrService, private http: HttpClient) { }


  getProfessions(): TTSProfessionDto[] {
    return (ProfessionsJson as any).default || ProfessionsJson;
  }


  private settings: Settings = SettingJson;
  getData(key: string): string | undefined {
    return this.settings[key];
  }

  ToastMessage(type: string, title: string, message: string) {
    if (type === "Error") {
      this.toastr.error(message, title);
    }
    else if (type === "Warning") {
      this.toastr.warning(message, title);
    }
    else if (type === "Success") {
      this.toastr.success(message, title);
    }
    else if (type === "Information") {
      this.toastr.info(message, title);
    }
    else {
      this.toastr.show(message, title);
    }
  }

}
