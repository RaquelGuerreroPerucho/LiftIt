import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContasenyaPage } from './recuperar-contasenya.page';

describe('RecuperarContasenyaPage', () => {
  let component: RecuperarContasenyaPage;
  let fixture: ComponentFixture<RecuperarContasenyaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContasenyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
