import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formboletos } from './formboletos';

describe('Formboletos', () => {
  let component: Formboletos;
  let fixture: ComponentFixture<Formboletos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formboletos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formboletos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
