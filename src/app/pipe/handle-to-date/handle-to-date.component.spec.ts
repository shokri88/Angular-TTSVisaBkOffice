import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleToDateComponent } from './handle-to-date.component';

describe('HandleToDateComponent', () => {
  let component: HandleToDateComponent;
  let fixture: ComponentFixture<HandleToDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleToDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
