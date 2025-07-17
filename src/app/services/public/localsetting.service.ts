import { Injectable } from '@angular/core';
import { ISetting } from '../../domains/interfaces/ISetting';
import *  as  SettingJson from '../../SettingData.json';

interface Settings {
  [key: string]: string; // فرض می‌کنیم همه مقادیر رشته هستند
}

@Injectable({
  providedIn: 'root'
})
export class LocalsettingService {
  private settings: Settings = SettingJson;
  getData(key: string): string | undefined {
    return this.settings[key];
  }
}
