import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSillas } from './form-sillas';

describe('FormSillas', () => {
  let component: FormSillas;
  let fixture: ComponentFixture<FormSillas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSillas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSillas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
