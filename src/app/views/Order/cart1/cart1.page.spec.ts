import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart1Page } from './cart1.page';

describe('Cart1Page', () => {
  let component: Cart1Page;
  let fixture: ComponentFixture<Cart1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Cart1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
