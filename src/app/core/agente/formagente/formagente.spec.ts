import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formagente } from './formagente';

describe('Formagente', () => {
  let component: Formagente;
  let fixture: ComponentFixture<Formagente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formagente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formagente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
