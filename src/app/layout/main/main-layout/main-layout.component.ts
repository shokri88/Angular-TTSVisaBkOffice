import { Component } from '@angular/core';
import { ContentLayoutComponent } from "../../content/content-layout/content-layout.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { MainFooterComponent } from "../main-footer/main-footer.component";
import { MainMenuComponent } from "../main-menu/main-menu.component";

@Component({
  selector: 'app-main-layout',
  imports: [ContentLayoutComponent, MainHeaderComponent, MainFooterComponent, MainMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
