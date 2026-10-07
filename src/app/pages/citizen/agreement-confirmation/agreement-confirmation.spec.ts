import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementConfirmation } from './agreement-confirmation';

describe('AgreementConfirmation', () => {
  let component: AgreementConfirmation;
  let fixture: ComponentFixture<AgreementConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(AgreementConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
