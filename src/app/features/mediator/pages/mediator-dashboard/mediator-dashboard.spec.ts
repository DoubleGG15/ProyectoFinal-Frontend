import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatorDashboard } from './mediator-dashboard';

describe('MediatorDashboard', () => {
  let component: MediatorDashboard;
  let fixture: ComponentFixture<MediatorDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediatorDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediatorDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
