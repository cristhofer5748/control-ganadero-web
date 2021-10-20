import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMilkComponent } from './registration-milk.component';

describe('RegistrationMilkComponent', () => {
  let component: RegistrationMilkComponent;
  let fixture: ComponentFixture<RegistrationMilkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationMilkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
