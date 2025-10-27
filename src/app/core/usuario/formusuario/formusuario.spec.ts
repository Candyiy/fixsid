import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formusuario } from './formusuario';

describe('Formusuario', () => {
  let component: Formusuario;
  let fixture: ComponentFixture<Formusuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formusuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formusuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
