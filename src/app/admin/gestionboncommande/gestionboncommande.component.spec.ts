import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionboncommandeComponent } from './gestionboncommande.component';

describe('GestionboncommandeComponent', () => {
  let component: GestionboncommandeComponent;
  let fixture: ComponentFixture<GestionboncommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionboncommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionboncommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
