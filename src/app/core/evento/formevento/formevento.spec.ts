import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formevento } from './formevento';

describe('Formevento', () => {
  let component: Formevento;
  let fixture: ComponentFixture<Formevento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formevento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formevento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
