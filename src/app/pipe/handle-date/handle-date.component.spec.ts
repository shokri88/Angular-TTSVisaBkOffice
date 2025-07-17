import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleDateComponent } from './handle-date.component';

describe('HandleDateComponent', () => {
  let component: HandleDateComponent;
  let fixture: ComponentFixture<HandleDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
