import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStatus } from './case-status';

describe('CaseStatus', () => {
  let component: CaseStatus;
  let fixture: ComponentFixture<CaseStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
