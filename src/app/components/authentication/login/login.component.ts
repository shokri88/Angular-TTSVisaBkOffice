import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MemberService } from '../../../services/authentication/member.service';
import { LocalStorageService } from '../../../services/public/localstorage.service';
import { TokenService } from '../../../services/public/token.service';
import { TestserverService } from '../../../services/public/testserver.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private _TestServerService: TestserverService, private _TokenService: TokenService, private _LocalStorageService: LocalStorageService,
    private _MemberService: MemberService, private fb: FormBuilder) { }

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
      console.log(this.LoginForm.value);
    }
  }



}
