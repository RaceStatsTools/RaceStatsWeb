import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRankingComponent } from './track-ranking.component';

describe('StatsComponent', () => {
  let component: TrackRankingComponent;
  let fixture: ComponentFixture<TrackRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
