import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProgQnsComponent } from './bulk-prog-qns.component';

describe('BulkProgQnsComponent', () => {
  let component: BulkProgQnsComponent;
  let fixture: ComponentFixture<BulkProgQnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkProgQnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkProgQnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
