import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowMenuComponent } from './cow-menu.component';

describe('CowMenuComponent', () => {
  let component: CowMenuComponent;
  let fixture: ComponentFixture<CowMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CowMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
