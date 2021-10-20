import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatalityComponent } from './natality.component';

describe('NatalityComponent', () => {
  let component: NatalityComponent;
  let fixture: ComponentFixture<NatalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NatalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
