import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProLinksComponent } from './all-pro-links.component';

describe('AllProLinksComponent', () => {
  let component: AllProLinksComponent;
  let fixture: ComponentFixture<AllProLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
