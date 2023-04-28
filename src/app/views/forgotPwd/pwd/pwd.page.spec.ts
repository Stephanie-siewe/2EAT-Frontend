import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PwdPage } from './pwd.page';

describe('PwdPage', () => {
  let component: PwdPage;
  let fixture: ComponentFixture<PwdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
