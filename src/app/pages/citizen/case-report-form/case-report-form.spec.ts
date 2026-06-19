import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseReportForm } from './case-report-form';

describe('CaseReportForm', () => {
  let component: CaseReportForm;
  let fixture: ComponentFixture<CaseReportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseReportForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseReportForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
