import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MemberService } from '../../../services/authentication/member.service';
import { LocalStorageService } from '../../../services/public/localstorage.service';
import { TokenService } from '../../../services/public/token.service';
import { TestserverService } from '../../../services/public/testserver.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerMessage } from '../../../domains/models/ServerMessage';
import { LocalsettingService } from '../../../services/public/localsetting.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private _LocalStorageService: LocalStorageService,
    private _MemberService: MemberService, private fb: FormBuilder, private settingService: LocalsettingService) { }

  LoginForm!: FormGroup;
  submitted = false;
  Isloading: boolean = false;

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      Username: ['', Validators.required], Password: ['', Validators.required],
    });
  }

  async LoginUser() {
    if (this.LoginForm.valid) {

      this.Isloading = true;
      var _Username = this.LoginForm.controls['Username'].value;
      var _Password = this.LoginForm.controls['Password'].value;

      (await this._MemberService.LoginUser(_Username, _Password)).subscribe({
        next: (data) => this.LoginSuccess(data),
        error: (error) => {
          throw new Error('Local Error');
        },
        complete: () => {
          this.Isloading = false;
        }
      });

    }
    else {
      this.settingService.ToastMessage('Warning', 'Validation Error','Please fill all required fields');
    }
  }

  LoginSuccess(data: any) {
    if (data.id) {
      this.settingService.ToastMessage(data.serverMessage.type, data.serverMessage.title, data.serverMessage.message);
      if (data.serverMessage.code == 100) {
        this._LocalStorageService.SaveToLocalStorage(data);
        window.location.href = "/home"
      }
      else {
        this.Isloading = true;
      }
    }
    else {
      try {
        var obj = data as ServerMessage;
        this.settingService.ToastMessage(obj.type, obj.title, obj.message);
      } catch {
        throw new Error('Local Error');
      }
    }
  }

}
