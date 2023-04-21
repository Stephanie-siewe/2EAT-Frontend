import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionPage } from './connection.page';

describe('ConnectionPage', () => {
  let component: ConnectionPage;
  let fixture: ComponentFixture<ConnectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
