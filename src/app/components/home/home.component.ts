import { Component } from '@angular/core';
import { GlobalserviceService } from '../../services/public/globalservice.service';

declare function renderCharts(): any;

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _GlobalService: GlobalserviceService) { }

  ngOnInit(): void {
    this._GlobalService.LoaderLoad(true);
    setTimeout(() => {
      renderCharts();
      this._GlobalService.LoaderLoad(false);
    }, 3000);
  }

  // Additional methods can be added as needed

}
