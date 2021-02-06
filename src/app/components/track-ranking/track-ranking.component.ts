import { Component, OnInit, NgZone, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { RankingDataSource } from 'src/app/datasources/ranking.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  dataSource: RankingDataSource;
  displayedColumns: string[] = [
    'rank',
    'country',
    'nickname',
    'time',
    'link'
  ];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService
    ) {
      this.dataSource = new RankingDataSource(this.apiService)
    }

  ngOnInit() {
    this.paginator.pageSize = 8;
    this.paginator.pageIndex = 0;
    this.search();
  }

  search() {
    this.dataSource.search(this.trackId, this.paginator.pageSize, this.paginator.pageIndex);
  }

  onPageChanged(pageEvent) {
    this.search();
  }

  viewPilot(pilot: string) {
    const url = `/users/${pilot}`;
    console.log(url)
    this.location.go(url);
  }
}
