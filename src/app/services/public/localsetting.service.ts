import { Injectable } from '@angular/core';
import { ISetting } from '../../domains/interfaces/ISetting';
import *  as  SettingJson from '../../SettingData.json';

@Injectable({
  providedIn: 'root'
})
export class LocalsettingService {

  constructor() { }

  getData(Key: string) {
    let SettingArr: ISetting[] = SettingJson;
    for (var i = 0; i < SettingArr.length; i++) {
      if (SettingArr[i].Key == Key) {
        return SettingArr[i].Val;
      }
    }
    return "Error";
  }
}
