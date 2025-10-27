import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formpublicidad } from './formpublicidad';

describe('Formpublicidad', () => {
  let component: Formpublicidad;
  let fixture: ComponentFixture<Formpublicidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formpublicidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formpublicidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
