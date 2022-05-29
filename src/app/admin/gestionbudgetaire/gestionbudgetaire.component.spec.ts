import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionbudgetaireComponent } from './gestionbudgetaire.component';

describe('GestionbudgetaireComponent', () => {
  let component: GestionbudgetaireComponent;
  let fixture: ComponentFixture<GestionbudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionbudgetaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionbudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
