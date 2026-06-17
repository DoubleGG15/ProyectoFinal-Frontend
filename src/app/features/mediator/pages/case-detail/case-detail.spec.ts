import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetail } from './case-detail';

describe('CaseDetail', () => {
  let component: CaseDetail;
  let fixture: ComponentFixture<CaseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
