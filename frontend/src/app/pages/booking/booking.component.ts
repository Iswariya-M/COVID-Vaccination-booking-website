import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HospitalService } from '../../hospital.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  booking = {
    name: '',
    phoneNumber: '',
    dob: '',
    age: '',
    bookingDate: '',
    hospital: '',
  };

  hospitals: any[] = []; 
  minBookingDate!: string;
  
  constructor(private http: HttpClient, private hospitalService: HospitalService) {}

  ngOnInit() {
    this.loadHospitals();
    this.setMinBookingDate();
  }

  loadHospitals() {
    this.hospitalService.getHospitalsForBook()
      .subscribe(
        hospitals => {
          this.hospitals = hospitals;
        },
        error => {
          console.error('Error loading hospitals', error);
        }
      );
  }

  setMinBookingDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    this.minBookingDate = today.toISOString().split('T')[0];
  }

  calculateAge() {
    if (this.booking.dob) {
      const dob = new Date(this.booking.dob);
      const today = new Date();

      const age = today.getFullYear() - dob.getFullYear();
      this.booking.age = age.toString();
    }
  }

  submitBooking() {

    const selectedDob = new Date(this.booking.dob);
    const selectedBookingDate = new Date(this.booking.bookingDate);
    const today = new Date();

    if (selectedDob > today) {
      alert('Invalid Date of Birth. ');
      return; 
    }
  

    const age = today.getFullYear() - selectedDob.getFullYear();
    if (age < 2) {
      alert('Invalid Age.  Age must be above 2 years.');
      return; 
    }

    
    if (selectedBookingDate < today) {
      alert('Invalid booking date.');
      return;
    }


    this.http.post('http://localhost:5000/api/bookings', this.booking)
      .subscribe(
        response => {
          alert('Booking successful');
          this.resetForm();
        },
        error => {
          alert('Booking failed. ' + error.error.error);
        }
      );
  }

  resetForm() {
    this.booking = {
      name: '',
      phoneNumber: '',
      dob: '',
      age: '',
      bookingDate: '',
      hospital: '',
    };
    this.setMinBookingDate();
  }
}

