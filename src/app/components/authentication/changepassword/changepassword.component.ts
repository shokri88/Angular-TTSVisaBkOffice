import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerMessage } from '../../../domains/models/ServerMessage';
import { MemberService } from '../../../services/authentication/member.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { LocalsettingService } from '../../../services/public/localsetting.service';
import { LocalStorageService } from '../../../services/public/localstorage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent implements OnInit {

  constructor(private _MemberService: MemberService, private fb: FormBuilder, private _SettingService: LocalsettingService,
    private _GlobalService: GlobalserviceService, private _LocalStorageService: LocalStorageService) { }

  RegisterForm!: FormGroup;
  submitted = false;
  Isloading: boolean = false;

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      OldPassword: ['', Validators.required], NewPassword: ['', Validators.required], ConfirmPassword: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.RegisterForm.valid) {

      this.Isloading = true;

      var _OldPassword = this.RegisterForm.controls['OldPassword'].value;
      var _NewPassword = this.RegisterForm.controls['NewPassword'].value;
      var _ConfirmPassword = this.RegisterForm.controls['ConfirmPassword'].value;
      var member = this._LocalStorageService.GetFromLocalStorage();

      if (_NewPassword == _ConfirmPassword) {
        this._GlobalService.LoaderLoad(true);
        (await this._MemberService.ChangeUserPassword(member.userName, _OldPassword, _NewPassword)).subscribe({
          next: (data) => {
            this.ChangeSuccess(data);
          },
          error: (error) => {
            this.Isloading = false;
            throw new Error(error);
          },
          complete: () => {
            this.Isloading = false;
            this._GlobalService.LoaderLoad(false);
          }
        });
      }
      else
        this._SettingService.ToastMessage("Warning", "Warning", "New password and confirm password not equal");
    }
  }

  ChangeSuccess(data: any) {
    if (data.id) {
      this._SettingService.ToastMessage(data.serverMessage.type, data.serverMessage.title, data.serverMessage.message);
      if (data.serverMessage.code == 100) {
        this._LocalStorageService.SaveToLocalStorage(data);
      }
    }
    else {
      try {
        var obj = data as ServerMessage;
        this._SettingService.ToastMessage(obj.type, obj.title, obj.message);
      } catch (error) {
      }
    }
  }

}
