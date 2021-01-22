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
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  @Input() trackId: string = '';
  laps:lap[] = [
    {
      "lap": 0,
      "time": 41.122
    },
    {
      "lap": 1,
      "time": 40.591
    },
    {
      "lap": 2,
      "time": 41.285
    },
    {
      "lap": 3,
      "time": 40.718
    },
    {
      "lap": 4,
      "time": 42.169
    },
    {
      "lap": 5,
      "time": 40.791
    }
  ];
  races = [];
  displayedColumns: string[] = ['lap', 'time'];
  dataSource = new MatTableDataSource(this.laps);
  
  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService
    ) {
      
    }

  ngOnInit() {
    if (this.trackId != '') {
      console.log(this.trackId)
    } else {
      console.log('All tracks')
    }
    this.apiService.listRacesByTrackId(this.trackId)
    .subscribe(races => {
      this.races = races;
      this.dataSource.data = this.races
    });
    /*
    this.apiService.listRacesByTrack()
    .subscribe(tracks => {
      this.tracks = tracks
    });
    */
  }
}
