import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMilkComponent } from './main-milk.component';

describe('MainMilkComponent', () => {
  let component: MainMilkComponent;
  let fixture: ComponentFixture<MainMilkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMilkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
