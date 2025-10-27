import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decorado } from './decorado';

describe('Decorado', () => {
  let component: Decorado;
  let fixture: ComponentFixture<Decorado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decorado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decorado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
