import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../../services/authentication/member.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { CompanyDto } from '../../../domains/dtos/authentication/CompanyDto';
import { ApplicationUserDto } from '../../../domains/dtos/authentication/ApplicationUserDto';
import { ServerMessage } from '../../../domains/models/ServerMessage';
import { LocalsettingService } from '../../../services/public/localsetting.service';

@Component({
  selector: 'app-adduser',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {

  constructor(private _MemberService: MemberService, private fb: FormBuilder,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService) { }

  CompanyArr!: CompanyDto[]
  RegisterForm!: FormGroup;
  Isloading: boolean = false;

  async ngOnInit() {

    this.RegisterForm = this.fb.group({
      UserName: ['', Validators.required], Email: ['', [Validators.email, Validators.required]], FirstName: ['', Validators.required],
      LastName: ['', Validators.required], IsConfirm: [true], PhoneNumber: ['', Validators.required], companyId: ['', Validators.required]
    });



    this.LoadCompanyList();
  }

  async LoadCompanyList() {
    this._GlobalService.LoaderLoad(true);
    (await this._MemberService.GetCompanyList()).subscribe({
      next: (data) => {
        this.CompanyArr = data;
        // LoadSelect2();
      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this._GlobalService.LoaderLoad(false);
      }
    });
  }

  async onSubmit() {
    if (this.RegisterForm.valid) {
      this.Isloading = true;
      var objDto = {} as ApplicationUserDto;
      objDto = this.RegisterForm.value;
      objDto.id = "";
      this._GlobalService.LoaderLoad(true);
      (await this._MemberService.RegisterUser(objDto)).subscribe({
        next: (data) => this.RegisterSuccess(data),
        error: (error) => {
          this.Isloading = false;
          throw new Error(error);
        },
        complete: () => {
          this._GlobalService.LoaderLoad(false);
          this.Isloading = false;
        }
      });

    }
  }

  RegisterSuccess(data: ServerMessage): void {
    this._SettingService.ToastMessage(data.type, data.title, data.message);
    if (data.code == 100) {
      this.RegisterForm.reset();
      this.RegisterForm.controls['IsConfirm'].setValue(true);
    }
  }


}
