import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificatyComponent } from './authentificaty.component';

describe('AuthentificatyComponent', () => {
  let component: AuthentificatyComponent;
  let fixture: ComponentFixture<AuthentificatyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificatyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentificatyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
