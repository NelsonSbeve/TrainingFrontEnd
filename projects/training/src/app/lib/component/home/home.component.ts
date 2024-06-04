import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ApiService} from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { SkillsComponent } from '../Skills/Skills.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgToastModule, FormsModule, SkillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showPopUpForm: boolean = false;
  items: any[] | undefined;
  filteredItems: any[] | undefined;

  constructor(
    private apiService: ApiService,
  ) {}

  viewSkills() {
    this.showPopUpForm = true;
  }
  killSkills(isClosed: boolean) {
    this.showPopUpForm = isClosed;
  }



  // fetchItems() {
  //   if (this.apiService) {
  //     this.apiService.getItems().subscribe((response) => {
  //       console.log('Items:', response);
  //       this.items = response as any[];
  //       this.filteredItems = this.items;
  //     });
  //   }
  // }


}


