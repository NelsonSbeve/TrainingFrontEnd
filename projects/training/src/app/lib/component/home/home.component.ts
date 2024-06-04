import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterOutlet,NgToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
