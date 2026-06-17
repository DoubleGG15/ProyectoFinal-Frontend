import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementForm } from './agreement-form';

describe('AgreementForm', () => {
  let component: AgreementForm;
  let fixture: ComponentFixture<AgreementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
