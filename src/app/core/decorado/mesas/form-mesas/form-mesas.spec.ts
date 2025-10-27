import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMesas } from './form-mesas';

describe('FormMesas', () => {
  let component: FormMesas;
  let fixture: ComponentFixture<FormMesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMesas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
