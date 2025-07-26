import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisarequestsComponent } from './visarequests.component';

describe('VisarequestsComponent', () => {
  let component: VisarequestsComponent;
  let fixture: ComponentFixture<VisarequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisarequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisarequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
