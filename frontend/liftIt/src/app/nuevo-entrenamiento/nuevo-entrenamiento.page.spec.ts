import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoEntrenamientoPage } from './nuevo-entrenamiento.page';

describe('NuevoEntrenamientoPage', () => {
  let component: NuevoEntrenamientoPage;
  let fixture: ComponentFixture<NuevoEntrenamientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEntrenamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
