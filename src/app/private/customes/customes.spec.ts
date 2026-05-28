import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customes } from './customes';

describe('Customes', () => {
  let component: Customes;
  let fixture: ComponentFixture<Customes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Customes],
    }).compileComponents();

    fixture = TestBed.createComponent(Customes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
