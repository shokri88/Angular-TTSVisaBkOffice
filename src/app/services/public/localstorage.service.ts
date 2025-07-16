import { Injectable } from '@angular/core';
import { IMember } from '../../domains/interfaces/IMember';
import { Member } from '../../domains/models/Member';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  SaveToLocalStorage(Member: IMember) {
    localStorage.setItem("companyName", Member.companyName);
    localStorage.setItem("firstName", Member.firstName);
    localStorage.setItem("lastName", Member.lastName);
    localStorage.setItem("id", Member.id);
    localStorage.setItem("officeCode", Member.officeCode);
    localStorage.setItem("userName", Member.userName);
    localStorage.setItem("password", Member.password);
  }

  GetFromLocalStorage(): IMember {
    var objMember = new Member();
    objMember.companyName = localStorage.getItem("companyName")!;
    objMember.firstName = localStorage.getItem("firstName")!;
    objMember.lastName = localStorage.getItem("lastName")!;
    objMember.id = localStorage.getItem("id")!;
    objMember.officeCode = localStorage.getItem("officeCode")!;
    objMember.userName = localStorage.getItem("userName")!;
    objMember.password = localStorage.getItem("password")!;
    return objMember;
  }

  ClearLocalStorage() {
    localStorage.removeItem("companyName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("id");
    localStorage.removeItem("officeCode");
    localStorage.removeItem("userName");
    localStorage.removeItem("password");
  }

}
