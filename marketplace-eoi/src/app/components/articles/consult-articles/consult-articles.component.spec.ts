import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultArticlesComponent } from './consult-articles.component';

describe('ConsultArticlesComponent', () => {
  let component: ConsultArticlesComponent;
  let fixture: ComponentFixture<ConsultArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
