import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllGrillingPage } from './all-grilling.page';

describe('AllGrillingPage', () => {
  let component: AllGrillingPage;
  let fixture: ComponentFixture<AllGrillingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllGrillingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
