import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospital.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  hospitals: any[] = [];
  newHospital: any = {
    name: '',
    address: '',
    image: ''
  };

  constructor(private hospitalService: HospitalService,private hospitalDataService: DataService) {}

  ngOnInit(): void {
    // this.hospitalDataService.hospitals$.subscribe(
    //   hospitals => this.hospitals = hospitals
    // );
    this.loadHospitals();
  }

  onSubmit() {
    this.hospitalService.addHospital(this.newHospital).subscribe(
      (response) => {
        console.log('Hospital added successfully:', response);
        this.loadHospitals(); // Refresh the hospital list
        this.clearForm(); // Clear the form
      },
      (error) => {
        console.error('Error adding hospital:', error);
      }
    );
  }
  
  clearForm() {
    this.newHospital = {
      name: '',
      address: '',
      image: ''
    };
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe(
      (data) => {
        this.hospitals = data;
      },
      (error) => {
        console.error('Error fetching hospitals:', error);
      }
    );
  }



  deleteHospital(hospitalId: number) {
    this.hospitalService.deleteHospital(hospitalId).subscribe(
      () => {
        console.log('Hospital deleted successfully');
        this.loadHospitals(); // Refresh the hospital list
      },
      (error) => {
        console.error('Error deleting hospital:', error);
      }
    );
  }
  
  
}
