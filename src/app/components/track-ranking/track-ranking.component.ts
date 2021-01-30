import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

export interface lap {
  lap: number,
  time: number,
}

@Component({
  selector: 'app-track-ranking',
  templateUrl: './track-ranking.component.html',
  styleUrls: ['./track-ranking.component.scss']
})
export class TrackRankingComponent implements OnInit {
  @Input() trackId: string = '';
  rankings:any[] = [
  ];
  
  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService
    ) {
      
    }

  ngOnInit() {
    this.apiService.trackRankings(this.trackId)
    .subscribe(rankings => {
      this.rankings = rankings;
    });

  }
}
