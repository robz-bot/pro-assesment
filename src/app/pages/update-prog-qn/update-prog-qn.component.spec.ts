import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProgQnComponent } from './update-prog-qn.component';

describe('UpdateProgQnComponent', () => {
  let component: UpdateProgQnComponent;
  let fixture: ComponentFixture<UpdateProgQnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProgQnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProgQnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
