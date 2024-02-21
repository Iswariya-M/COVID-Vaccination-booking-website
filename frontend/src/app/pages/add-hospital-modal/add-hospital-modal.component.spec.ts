import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalModalComponent } from './add-hospital-modal.component';

describe('AddHospitalModalComponent', () => {
  let component: AddHospitalModalComponent;
  let fixture: ComponentFixture<AddHospitalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHospitalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHospitalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
