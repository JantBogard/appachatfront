import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisfournisseurComponent } from './devisfournisseur.component';

describe('DevisfournisseurComponent', () => {
  let component: DevisfournisseurComponent;
  let fixture: ComponentFixture<DevisfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisfournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
