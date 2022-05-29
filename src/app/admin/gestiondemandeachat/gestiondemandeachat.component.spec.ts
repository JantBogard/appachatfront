import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondemandeachatComponent } from './gestiondemandeachat.component';

describe('GestiondemandeachatComponent', () => {
  let component: GestiondemandeachatComponent;
  let fixture: ComponentFixture<GestiondemandeachatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestiondemandeachatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestiondemandeachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
