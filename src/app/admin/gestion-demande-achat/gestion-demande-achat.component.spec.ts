import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDemandeAchatComponent } from './gestion-demande-achat.component';

describe('GestionDemandeAchatComponent', () => {
  let component: GestionDemandeAchatComponent;
  let fixture: ComponentFixture<GestionDemandeAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDemandeAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDemandeAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
