import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospital.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  hospitals: any[] = [];
  searchQuery: string = '';
  searchResultsNotFound: boolean = false;
  router: any;


  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.hospitalService.getHospitalsForBook().subscribe(
      (data) => {
        this.hospitals = data;
      },
      (error) => {
        console.error('Error fetching hospitals for book:', error);
      }
    );
  }


  searchHospitals() {
    if (this.searchQuery.trim() !== '') {
      this.hospitalService.searchHospitals(this.searchQuery).subscribe(
        (data) => {
          this.hospitals = data;
          this.searchResultsNotFound = data.length === 0; 
        },
        (error) => {
          console.error('Error searching hospitals:', error);
        }
      );
    } else {
      // If search query is empty, load all hospitals
      this.loadHospitals();
    }
  }

  clearSearch() {
    // Clear the search input and load all hospitals
    this.searchQuery = '';
    this.loadHospitals();
  }

  bookHospital(hospital: any) {
    // Navigate to the booking component with the hospital ID as a parameter
    this.router.navigate(['/booking', hospital.id]);
  }
}



