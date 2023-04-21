import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrillingDetailsPage } from './grilling-details.page';

describe('GrillingDetailsPage', () => {
  let component: GrillingDetailsPage;
  let fixture: ComponentFixture<GrillingDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GrillingDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
