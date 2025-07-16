import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeLayoutComponent } from './free-layout.component';

describe('FreeLayoutComponent', () => {
  let component: FreeLayoutComponent;
  let fixture: ComponentFixture<FreeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
