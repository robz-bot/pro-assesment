import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgQnComponent } from './add-prog-qn.component';

describe('AddProgQnComponent', () => {
  let component: AddProgQnComponent;
  let fixture: ComponentFixture<AddProgQnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgQnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgQnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
