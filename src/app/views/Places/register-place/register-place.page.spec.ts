import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RegisterPlacePage } from './register-place.page';

describe('RegisterPlacePage', () => {
  let component: RegisterPlacePage;
  let fixture: ComponentFixture<RegisterPlacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
