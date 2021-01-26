import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { StoreService } from './store.service';

const meUrl = '/api/users/me';
const registerUrl = '/api/users/';
const loginUrl = '/api/auth/';
const lapUrl = '/api/stats/laps/';
const raceUrl = '/api/stats/races/';
const tracksUrl = '/api/stats/tracks/';
const racesByLengthUrl = '/api/stats/tracks/:id/races';
const bestLapsUrl = '/api/stats/laps/best/:id';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(
    public http: HttpClient,
    public storeService: StoreService
    ) { 

    }

    handleError(error: HttpErrorResponse) {

      /*if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
          // this.storeService.setUser(null);
      }*/
      // Return an observable with a user-facing error message.
      //return throwError(
      //  'Something bad happened; please try again later.');

      console.log(error)/*
      if (error.status == 403) {
        this.storeService.user = null;
        return Observable.create();
      } else {
        const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(error);
      }*/
      return Observable.create();
    }

  signin(email: string, password: string): Observable<any> {
    var usr = {
      email: email,
      password: password
    }
    return this.http.post<any>(loginUrl, usr).pipe(
      catchError(this.handleError));
  }

  register(email: string, password: string, nickname: string): Observable<any> {
    var usr = {
      email: email,
      password: password,
      nickname: nickname
    }
    return this.http.post<any>(registerUrl, usr).pipe(
      catchError(this.handleError));
  }
  
  me(): Observable<any> {
    console.log(this.storeService.getToken())
    return this.http.get<any>(meUrl).pipe(
      catchError(this.handleError));
  }
  
  sendLap(lap: any): Observable<any> {
    console.log("sendLap", lap);
    return this.http.post<any>(lapUrl, lap).pipe(
      catchError(this.handleError));
  }
  
  sendRace(race: any): Observable<any> {
    console.log("sendRace", race);
    return this.http.post<any>(raceUrl, race).pipe(
      catchError(this.handleError));
  }

  listTracks() : Observable<any> {
    return this.http.get<any>(tracksUrl).pipe(
      catchError(this.handleError));
  }

  listUserRacesByTrackId(id) : Observable<any> {
    let url = racesByLengthUrl.replace(':id', id);
    return this.http.get<any>(url).pipe(
      catchError(this.handleError));
  }

  listBestLasps(id) : Observable<any> {
    let url = bestLapsUrl.replace(':id', id);
    return this.http.get<any>(url).pipe(
      catchError(this.handleError));
  }
}