import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrdersComponent } from './consult-orders.component';

describe('ConsultOrdersComponent', () => {
  let component: ConsultOrdersComponent;
  let fixture: ComponentFixture<ConsultOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
