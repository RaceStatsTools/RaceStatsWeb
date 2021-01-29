import { Component, OnInit, NgZone, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-track-best-laps',
  templateUrl: './track-best-laps.component.html',
  styleUrls: ['./track-best-laps.component.scss']
})
export class TrackBestLapsComponent implements OnInit {
  @Input() trackId: string = '';
  @ViewChild('bestLapsHistory') bestLapsHistory: HTMLElement;
  theme: string ="racestats"
  echartsInstance: any;
  minMax = {
    min: 60,
    max: 0
  }

  history: any = [];
  record: any = [];
  isLoading = false;

  options = {
    darkMode: true,
    title: {
      text: "Lap times history",
      subtext: "(30 days)"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['My best lap times', 'Track record']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          'd -30',
          'd -29',
          'd -28',
          'd -27',
          'd -26',
          'd -25',
          'd -24',
          'd -23',
          'd -22',
          'd -21',
          'd -20',
          'd -19',
          'd -18',
          'd -17',
          'd -16',
          'd -15',
          'd -14',
          'd -13',
          'd -12',
          'd -11',
          'd -10',
          'd -9',
          'd -8',
          'd -7',
          'd -6',
          'd -5',
          'd -4',
          'd -3',
          'd -2',
          'd -1',
          'd'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 60,
        max: 0,
      }
    ],
    series: [
      {
        name: 'Track record',
        type: 'line',
        stack: 'times',
        connectNulls: true,
        emphasis: [{
          scale: false,
          }],
        data: [],

      },
      {
        name: 'My best lap times',
        type: 'line',
        stack: 'mytimes',
        connectNulls: true,
        emphasis: [{
          scale: false,
        }],
        data: []
      }
    ],

  };

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService
  ) {

  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
    this.apiService
      .listBestLapsHistory(this.trackId, 30, this.storeService.getUser().id)
      .subscribe(history => {
        this.history = history;
        let minMax = this.getMinMaxTime(this.history)
        this.options.yAxis[0].min = this.options.yAxis[0].min < this.minMax.min - 1 ? this.options.yAxis[0].min : this.minMax.min - 1;
        this.options.yAxis[0].max = this.options.yAxis[0].max > this.minMax.max + 1 ? this.options.yAxis[0].max : this.minMax.max + 1;
        this.options.series[1].data = this.history;
        this.echartsInstance.setOption(this.options);

      })

    this.apiService
      .listBestLapsHistory(this.trackId, 30, 0)
      .subscribe(record => {
        this.record = record;
        this.getMinMaxTime(this.record)
        this.options.yAxis[0].min = this.options.yAxis[0].min < this.minMax.min - 1 ? this.options.yAxis[0].min : this.minMax.min - 1;
        this.options.yAxis[0].max = this.options.yAxis[0].max > this.minMax.max + 1 ? this.options.yAxis[0].max : this.minMax.max + 1;
        this.options.series[0].data = this.record;
        this.echartsInstance.setOption(this.options);

      })
  }

  getMinMaxTime(times: Array<number>) {
    times.forEach(time => {
      if (time) {
        this.minMax.min = this.minMax.min == 0 || time < this.minMax.min ? time : this.minMax.min;
        this.minMax.max = this.minMax.max == 0 || time > this.minMax.max ? time : this.minMax.max;
      }
    })
  }

}
