import { Injectable } from '@angular/core';
import { Observable, of, throwError , } from 'rxjs';
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
    public storeService: StoreService,

    ) { 

    }

    handleError(error: HttpErrorResponse) {
      return of(error)
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