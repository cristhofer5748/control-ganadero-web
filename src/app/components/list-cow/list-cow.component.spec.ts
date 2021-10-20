import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCowComponent } from './list-cow.component';

describe('ListCowComponent', () => {
  let component: ListCowComponent;
  let fixture: ComponentFixture<ListCowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
