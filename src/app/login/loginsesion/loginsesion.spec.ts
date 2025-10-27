import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginsesion } from './loginsesion';

describe('Loginsesion', () => {
  let component: Loginsesion;
  let fixture: ComponentFixture<Loginsesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginsesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginsesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
