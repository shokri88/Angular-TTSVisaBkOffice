import { Component, OnInit } from '@angular/core';
import { TestserverService } from '../../../services/public/testserver.service';
import { LocalStorageService } from '../../../services/public/localstorage.service';
import { TokenService } from '../../../services/public/token.service';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
  providers: [TestserverService]
})
export class SplashComponent implements OnInit {

  constructor(private _TestserverService: TestserverService, private _LocalStorageService: LocalStorageService,
    private _TokenService: TokenService) { }

  ngOnInit(): void {
    this.ServerCheck();
  }

  async ServerCheck() {
    (await this._TestserverService.GetTest()).subscribe({
      next: (data) => {
        console.log("Server is running", data);
        if (data.code == 100) {
          this.CheckLogin();
        }
        else {
          console.log("Server Error");
        }
      },
      error: (error) => {
        console.log("Server Error", error);
      },
      complete: () => {
      }
    });
  }

  async CheckLogin() {
    if (this._LocalStorageService.GetFromLocalStorage().id != null) {
      this._TokenService.GetUserToken().subscribe({
        next: (data) => {
          if (data.token.length <= 0) {
            window.location.href = "/login"
          }
          else {
            window.location.href = "/home"
          }
        },
      });
    }
    else {
      window.location.href = "/login"
    }
  }

}
