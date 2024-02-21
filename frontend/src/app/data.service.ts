import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private hospitalsSubject = new Subject<any[]>();
  hospitals$ = this.hospitalsSubject.asObservable();
  static httpOptions: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; transferCache?: boolean | { includeHeaders?: string[] | undefined; } | undefined; };

  updateHospitals(hospitals: any[]) {
    this.hospitalsSubject.next(hospitals);
  }
}
