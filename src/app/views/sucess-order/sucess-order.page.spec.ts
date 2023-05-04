import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucessOrderPage } from './sucess-order.page';

describe('SucessOrderPage', () => {
  let component: SucessOrderPage;
  let fixture: ComponentFixture<SucessOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SucessOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
