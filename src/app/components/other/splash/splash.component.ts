import { Component, OnInit } from '@angular/core';
import { TestserverService } from '../../../services/public/testserver.service';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
    providers: [TestserverService]
})
export class SplashComponent implements OnInit {

  constructor(private _TestserverService: TestserverService) { }

  ngOnInit(): void {
     console.log("Server is running","1");
     this.CheckLogin();
     console.log("Server is running", "2");
  }

  async CheckLogin() {

    (await this._TestserverService.GetTest()).subscribe({
      next: (data) => {
        console.log("Server is running", data);
      },
      error: (error) => {
         console.log("Server Error", error);
      },
      complete: () => {
      }
    });
  }

}
