import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  sessionId: string | null = null;
  httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  createSession(): Observable<any> {
    const url = 'http://localhost:3000/login';
    return this.http.post<any>(url, null, this.httpOptions).pipe(
      tap(data => {
        this.sessionId = data.session_id;
      }, error => {
        console.log(error)
      })
    );
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.sessionId}`
      })
    };
  }
}
