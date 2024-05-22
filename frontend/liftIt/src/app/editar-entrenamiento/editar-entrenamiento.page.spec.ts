import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEntrenamientoPage } from './editar-entrenamiento.page';

describe('EditarEntrenamientoPage', () => {
  let component: EditarEntrenamientoPage;
  let fixture: ComponentFixture<EditarEntrenamientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEntrenamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
