import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOcorrenciaComponent } from './dialog-ocorrencia.component';

describe('DialogOcorrenciaComponent', () => {
  let component: DialogOcorrenciaComponent;
  let fixture: ComponentFixture<DialogOcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
