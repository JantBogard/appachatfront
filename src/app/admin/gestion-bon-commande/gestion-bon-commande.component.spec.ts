import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBonCommandeComponent } from './gestion-bon-commande.component';

describe('GestionBonCommandeComponent', () => {
  let component: GestionBonCommandeComponent;
  let fixture: ComponentFixture<GestionBonCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionBonCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
