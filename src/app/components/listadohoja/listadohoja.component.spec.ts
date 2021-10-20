import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadohojaComponent } from './listadohoja.component';

describe('ListadohojaComponent', () => {
  let component: ListadohojaComponent;
  let fixture: ComponentFixture<ListadohojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadohojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadohojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
