import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormContatoComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogFormContatoComponent;
  let fixture: ComponentFixture<DialogFormContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFormContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
