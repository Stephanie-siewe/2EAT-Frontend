import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionscameraPage } from './optionscamera.page';

describe('OptionscameraPage', () => {
  let component: OptionscameraPage;
  let fixture: ComponentFixture<OptionscameraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OptionscameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
