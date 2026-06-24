import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceReport } from './compliance-report';

describe('ComplianceReport', () => {
  let component: ComplianceReport;
  let fixture: ComponentFixture<ComplianceReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceReport],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplianceReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
