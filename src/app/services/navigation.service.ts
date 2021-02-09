import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {

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
}
