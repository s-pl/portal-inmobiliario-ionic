import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyFormPage } from './property-form.page';

describe('PropertyFormPage', () => {
  let component: PropertyFormPage;
  let fixture: ComponentFixture<PropertyFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
