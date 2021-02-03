import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  form: FormGroup;
  event: any;
  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService,
    private toastr: ToastrService
    ) {

    }

  ngOnInit() {
    this.apiService.listEvent("2021-02-02 21:30:00.000000+00", "2021-02-02 22:55:00.000000+00", [1, 2, 3, 5, 6, 8, 9,])
      .subscribe(event => {
        this.event = event;
        console.log(event)
      });
  }
}
