import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApplicationUserDto } from '../../../domains/dtos/authentication/ApplicationUserDto';
import { CompanyDto } from '../../../domains/dtos/authentication/CompanyDto';
import { ServerMessage } from '../../../domains/models/ServerMessage';
import { MemberService } from '../../../services/authentication/member.service';
import { GlobalserviceService } from '../../../services/public/globalservice.service';
import { LocalsettingService } from '../../../services/public/localsetting.service';

@Component({
  selector: 'app-updateuser',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent implements OnInit {

  constructor(private _MemberService: MemberService, private fb: FormBuilder, private route: ActivatedRoute,
    private _GlobalService: GlobalserviceService, private _SettingService: LocalsettingService) { }

  IsCompany = false;
  IsUserData = false;
  NovaBTBId: number = 0;

  UserId: string = "";
  CompanyArr!: CompanyDto[]

  UpdateForm!: FormGroup;
  Isloading: boolean = false;

  async ngOnInit() {

    const routeParams = this.route.snapshot.paramMap;
    this.UserId = routeParams.get('id') ?? "";

    this.UpdateForm = this.fb.group({
      UserName: ['', Validators.required], Email: ['', [Validators.email, Validators.required]], FirstName: ['', Validators.required],
      LastName: ['', Validators.required], IsConfirm: [true], PhoneNumber: ['', Validators.required], companyId: ['', Validators.required]
    });

    this._GlobalService.LoaderLoad(true);
    this.LoadCompanyList();
    this.LoadUserData();
  }

  async LoadUserData() {
    if (this.UserId) {
      (await this._MemberService.GetUser(this.UserId)).subscribe({
        next: (data) => this.GetUserSuccess(data),
        error: (error) => { throw new Error(error); },
        complete: () => {
          this.IsUserData = true;
          this.DisableLoader();
        }
      });
    }
  }

  async LoadCompanyList() {
    (await this._MemberService.GetCompanyList()).subscribe({
      next: (data) => {
        this.CompanyArr = data;
      },
      error: (error) => { throw new Error(error); },
      complete: () => {
        this.IsCompany = true;
        this.DisableLoader();
      }
    });
  }

  DisableLoader() {
    if (this.IsCompany && this.IsUserData) {
      this._GlobalService.LoaderLoad(false);
    }
  }

  GetUserSuccess(data: ApplicationUserDto): void {
    var ctrl = this.UpdateForm.controls;
    ctrl['UserName'].setValue(data.userName);
    ctrl['Email'].setValue(data.eMail);
    ctrl['FirstName'].setValue(data.firstName);
    ctrl['LastName'].setValue(data.lastName);
    ctrl['IsConfirm'].setValue(data.isConfirm);
    ctrl['PhoneNumber'].setValue(data.phoneNumber);
    ctrl['companyId'].setValue(data.companyId);
  }

  async onSubmit() {
    if (this.UpdateForm.valid) {
      this.Isloading = true;
      this._GlobalService.LoaderLoad(true);
      var objDto = {} as ApplicationUserDto;
      objDto = this.UpdateForm.value;
      objDto.id = this.UserId;
      (await this._MemberService.UpdateUser(objDto)).subscribe({
        next: (data) => this.UpdateSuccess(data),
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
  }

  UpdateSuccess(data: ServerMessage): void {
    this._SettingService.ToastMessage(data.type, data.title, data.message);
    if (data.code == 100) {
    }
  }

}
