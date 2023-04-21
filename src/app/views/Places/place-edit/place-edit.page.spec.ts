import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceEditPage } from './place-edit.page';

describe('PlaceEditPage', () => {
  let component: PlaceEditPage;
  let fixture: ComponentFixture<PlaceEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlaceEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
