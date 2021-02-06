import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { IRanking } from '../components/track-ranking/IRanking';
import { ApiService } from '../services/api.service';

export class RankingDataSource implements DataSource<IRanking> {

  private subject = new BehaviorSubject<IRanking[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public length = 0;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: ApiService) {}

  connect(collectionViewer: CollectionViewer): Observable<IRanking[]> {
      return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
  }

  finish() {
    this.loadingSubject.next(false);
    this.length = this.subject.value.length > 0 ? this.subject.value[0].total : 0;
  }

  search(trackId: string, pageSize: number, pageIndex: number) {
    this.loadingSubject.next(true);
    this.service.trackRankings(trackId, pageSize, pageIndex).pipe(
      catchError(() => of([])),
      finalize(() => this.finish())).subscribe(peoples => this.subject.next(peoples));
    ;
  }
}