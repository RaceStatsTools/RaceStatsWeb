import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RaceStatsWeb';
  pageTitle$: Observable<string>;
  pageTitle: string;
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.pageTitle$ = this.navigationService.pageTitle;

    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }

  ngAfterContentChecked() {
    this.navigationService.pageTitle.subscribe(value => {
      this.pageTitle = value;
      this.changeRef.detectChanges();
    })
  }
}
