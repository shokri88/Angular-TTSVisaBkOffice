import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-newvisa',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './newvisa.component.html',
  styleUrl: './newvisa.component.css'
})
export class NewvisaComponent {

}
