import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mantel } from './mantel';

describe('Mantel', () => {
  let component: Mantel;
  let fixture: ComponentFixture<Mantel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mantel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mantel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
