import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgQnListComponent } from './prog-qn-list.component';

describe('ProgQnListComponent', () => {
  let component: ProgQnListComponent;
  let fixture: ComponentFixture<ProgQnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgQnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgQnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
