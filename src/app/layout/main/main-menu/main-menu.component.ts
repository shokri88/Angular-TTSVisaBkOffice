import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../services/public/localstorage.service';

@Component({
  selector: 'app-main-menu',
  imports: [RouterModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit {

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


}
