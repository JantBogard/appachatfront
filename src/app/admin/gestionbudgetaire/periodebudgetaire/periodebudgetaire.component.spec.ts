import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodebudgetaireComponent } from './periodebudgetaire.component';

describe('PeriodebudgetaireComponent', () => {
  let component: PeriodebudgetaireComponent;
  let fixture: ComponentFixture<PeriodebudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodebudgetaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodebudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
