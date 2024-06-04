import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../../service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { SkillsComponent } from '../Skills/Skills.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getItems']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, CommonModule, FormsModule, SkillsComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        NgToastService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show skills form when viewSkills is called', () => {
    component.viewSkills();
    fixture.detectChanges();

    expect(component.showPopUpForm).toBeTrue();
    const skillsComponent = fixture.debugElement.query(By.css('app-Skills'));
    expect(skillsComponent).toBeTruthy();
  });

  it('should hide skills form when killSkills is called', () => {
    component.viewSkills(); // First, show the form
    fixture.detectChanges();

    component.killSkills(false);
    fixture.detectChanges();

    expect(component.showPopUpForm).toBeFalse();
    const skillsComponent = fixture.debugElement.query(By.css('app-Skills'));
    expect(skillsComponent).toBeNull();
  });

  it('should toggle showPopUpForm when popupChanged event is emitted from SkillsComponent', () => {
    component.viewSkills();
    fixture.detectChanges();

    const skillsComponent = fixture.debugElement.query(By.css('app-Skills')).componentInstance as SkillsComponent;
    skillsComponent.popupChanged.emit(false);
    fixture.detectChanges();

    expect(component.showPopUpForm).toBeFalse();
  });
});
