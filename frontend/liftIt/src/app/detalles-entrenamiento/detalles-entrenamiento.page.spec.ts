import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesEntrenamientoPage } from './detalles-entrenamiento.page';

describe('DetallesEntrenamientoPage', () => {
  let component: DetallesEntrenamientoPage;
  let fixture: ComponentFixture<DetallesEntrenamientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEntrenamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
