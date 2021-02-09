import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  tracks:any[] = []
  @Input() userId: number = -1;

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService,
    private navigationService: NavigationService
    ) {

    }

  ngOnInit() {
    this.navigationService.setPageTitle("Classement");

    this.apiService.listTracks()
      .subscribe(tracks => {
        this.tracks = tracks
      });
  }

}
