import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formsalon } from './formsalon';

describe('Formsalon', () => {
  let component: Formsalon;
  let fixture: ComponentFixture<Formsalon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formsalon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formsalon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
