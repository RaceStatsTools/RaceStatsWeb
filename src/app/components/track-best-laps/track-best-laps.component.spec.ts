import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBestLapsComponent } from './track-best-laps.component';

describe('StatsComponent', () => {
  let component: TrackBestLapsComponent;
  let fixture: ComponentFixture<TrackBestLapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackBestLapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBestLapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
