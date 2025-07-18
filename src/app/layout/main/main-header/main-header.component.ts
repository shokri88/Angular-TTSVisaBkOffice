import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/public/localstorage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [RouterModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent implements OnInit {

  FullName!: string;
  Company!: string;
  Avatar!: string;
  Id!: string;

  constructor(private _LocalStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.UpdateHeaderUser();
  }

  UpdateHeaderUser() {
    var member = this._LocalStorageService.GetFromLocalStorage();
    if (member != null) {
      this.Id = member.id;
      this.FullName = `${member.firstName} ${member.lastName}`
      this.Company = member.companyName;
      this.Avatar = `${member.firstName.substring(0, 1)} ${member.lastName.substring(0, 1)}`
    }
  }

  LogOut() {
    this._LocalStorageService.ClearLocalStorage();
    window.location.href = "/login"
  }

}
