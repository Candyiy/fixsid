import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sillas } from './sillas';

describe('Sillas', () => {
  let component: Sillas;
  let fixture: ComponentFixture<Sillas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sillas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sillas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
