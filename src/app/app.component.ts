import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare var initApp: () => void;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit {
  ngOnInit(): void {
        initApp();

  }


  
  ngAfterViewInit() {
    initApp();
  }
}
