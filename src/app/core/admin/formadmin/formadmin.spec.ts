import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formadmin } from './formadmin';

describe('Formadmin', () => {
  let component: Formadmin;
  let fixture: ComponentFixture<Formadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
