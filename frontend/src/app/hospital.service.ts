import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private apiUrl: string = 'http://localhost:5000/api/hospitals';
  constructor(private http: HttpClient) {}

  // Define httpOptions as a static property
  private static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',  // Make sure this matches your Angular app's origin
    })
  };
 
  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getHospitalsForBook(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/book`);
  }

  addHospital(newHospital: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newHospital, HospitalService.httpOptions);
  }

  deleteHospital(hospitalId: number): Observable<any> {
    const url = `${this.apiUrl}/${hospitalId}`;
    return this.http.delete<any>(url);
  }

  searchHospitals(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`);
  }

 
}
