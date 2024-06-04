import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './Skills.component';
import { ApiService } from '../../service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let toastService: jasmine.SpyObj<NgToastService>;
  let createItemSpy: jasmine.Spy;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['createItem']);
    const toastSpy = jasmine.createSpyObj('NgToastService', ['success', 'error']);

    createItemSpy = apiSpy.createItem.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [SkillsComponent, CommonModule, FormsModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: NgToastService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    toastService = TestBed.inject(NgToastService) as jasmine.SpyObj<NgToastService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createItem and show success toast on successful item creation', () => {
    const formData = { name: 'Test Skill', lvl: 1 };
    component.createNewItem(formData);

    expect(apiService.createItem).toHaveBeenCalledWith({
      name: formData.name,
      lvl: formData.lvl
    });
    expect(toastService.success).toHaveBeenCalledWith({
      detail: 'New Skill added!',
      summary: 'Success',
      duration: 5000
    });
  });

  it('should show error toast on item creation error', () => {
    const errorResponse = {
      error: ['Test Error Message']
    };
    apiService.createItem.and.returnValue(throwError(() => errorResponse));

    const formData = { name: 'Test Skill', lvl: 1 };
    component.createNewItem(formData);

    expect(apiService.createItem).toHaveBeenCalledWith({
      name: formData.name,
      lvl: formData.lvl
    });
    expect(toastService.error).toHaveBeenCalledWith({
      detail: 'Test Error Message',
      summary: 'Error'
    });
  });

  it('should emit popupChanged and hide form on hideAddSkillPopup', () => {
    spyOn(component.popupChanged, 'emit');

    component.hideAddSkillPopup();

    expect(component.popupChanged.emit).toHaveBeenCalledWith(false);
    expect(component.showAddSkillForm).toBeFalse();
  });
});
