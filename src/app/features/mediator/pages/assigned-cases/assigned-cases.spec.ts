import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCases } from './assigned-cases';

describe('AssignedCases', () => {
  let component: AssignedCases;
  let fixture: ComponentFixture<AssignedCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedCases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedCases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
