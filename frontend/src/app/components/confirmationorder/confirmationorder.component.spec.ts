import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationorderComponent } from './confirmationorder.component';

describe('ConfirmationorderComponent', () => {
  let component: ConfirmationorderComponent;
  let fixture: ComponentFixture<ConfirmationorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
