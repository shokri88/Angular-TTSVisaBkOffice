import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvisaComponent } from './newvisa.component';

describe('NewvisaComponent', () => {
  let component: NewvisaComponent;
  let fixture: ComponentFixture<NewvisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewvisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewvisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
