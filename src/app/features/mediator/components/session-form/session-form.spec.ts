import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionForm } from './session-form';

describe('SessionForm', () => {
  let component: SessionForm;
  let fixture: ComponentFixture<SessionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
