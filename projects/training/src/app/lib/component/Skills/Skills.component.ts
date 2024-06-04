import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Skills',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgToastModule, FormsModule],
  templateUrl: './Skills.component.html',
  styleUrls: ['./Skills.component.css']
})

export class SkillsComponent implements OnInit {

  showAddSkillForm: boolean = true;

  @Output() popupChanged = new EventEmitter<boolean>()


  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
  ) {}
  ngOnInit(): void {

  }

  createNewItem(formData: any) {
    const newItem = {
      lvl: formData.lvl,
      name: formData.name,
    };
    this.apiService.createItem(newItem).subscribe({
      next: async (response) => {
        console.log('Created item:', response);
        this.toast.success({ detail: 'New Skill added!', summary: 'Success', duration: 5000 });


        // Handle success or any UI updates here
      },
      error: (errorResponse) => {
        console.error('Error creating item:', errorResponse);
        if (errorResponse.error && Array.isArray(errorResponse.error) && errorResponse.error.length > 0) {
          const errorMessage = errorResponse.error[0]; // Extract the error message
          this.toast.error({ detail: errorMessage, summary: 'Error' });
        } else {
          this.toast.error({ detail: 'An error occurred while creating the item.', summary: 'Error' });
        }
        // Handle error or any UI updates here
      }
    });
  }

  hideAddSkillPopup() {
    this.popupChanged.emit(false);
    this.showAddSkillForm = false;
      // Emit the event to notify the parent component

  }



}
