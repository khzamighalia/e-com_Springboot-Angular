import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { authComponent } from './auth.component';

describe('LoginComponent', () => {
  let component: authComponent;
  let fixture: ComponentFixture<authComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Include necessary modules
      declarations: [authComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(authComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
