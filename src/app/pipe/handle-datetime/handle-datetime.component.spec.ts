import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleDatetimeComponent } from './handle-datetime.component';

describe('HandleDatetimeComponent', () => {
  let component: HandleDatetimeComponent;
  let fixture: ComponentFixture<HandleDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleDatetimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
