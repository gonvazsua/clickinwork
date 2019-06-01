import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichajeEventoComponent } from './fichaje-evento.component';

describe('FichajeEventoComponent', () => {
  let component: FichajeEventoComponent;
  let fixture: ComponentFixture<FichajeEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichajeEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichajeEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
