import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeBudgetaireComponent } from './periode-budgetaire.component';

describe('PeriodeBudgetaireComponent', () => {
  let component: PeriodeBudgetaireComponent;
  let fixture: ComponentFixture<PeriodeBudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodeBudgetaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeBudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
