import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumCowComponent } from './curriculum-cow.component';

describe('CurriculumCowComponent', () => {
  let component: CurriculumCowComponent;
  let fixture: ComponentFixture<CurriculumCowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumCowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumCowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
