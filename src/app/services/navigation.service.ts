import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private history: string[] = []
    public hasHistory: boolean = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private location: Location
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              this.history.push(event.urlAfterRedirects)
              console.log(this.history)
              this.hasHistory = this.history.length > 1 ? true : false;
            }
          })
    }
    public pageTitle = new BehaviorSubject<string>("RaceStats RX");

    setPageTitle(newTitle: string) {
        this.pageTitle.next(newTitle);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches)
    );

    isMobileSize$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 736px)']).pipe(
        map(result => result.matches)
    );

    back(): void {
        this.history.pop()
        this.hasHistory = this.history.length > 0 ? true : false;
        if (this.history.length > 0) {
          this.location.back()
          this.history.pop()
        } else {
          this.router.navigateByUrl('/')
        }
      }
}
