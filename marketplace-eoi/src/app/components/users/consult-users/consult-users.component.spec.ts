import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultUsersComponent } from './consult-users.component';

describe('ConsultUsersComponent', () => {
  let component: ConsultUsersComponent;
  let fixture: ComponentFixture<ConsultUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
