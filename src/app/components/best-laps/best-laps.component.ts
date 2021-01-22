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
  selector: 'app-best-laps',
  templateUrl: './best-laps.component.html',
  styleUrls: ['./best-laps.component.scss']
})
export class BestLapsComponent implements OnInit {
  personnalBestLaps:lap[] = [
  ];
  bestLaps:lap[] = [
  ];
  
  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService
    ) {
      
    }

  ngOnInit() {
    this.apiService.listBestLasps(0)
    .subscribe(bestLaps => {
      this.bestLaps = bestLaps;
    });

    this.apiService.listBestLasps(this.storeService.getUser().id)
    .subscribe(personnalBestlaps => {
      this.personnalBestLaps = personnalBestlaps;
    });
  }
}
