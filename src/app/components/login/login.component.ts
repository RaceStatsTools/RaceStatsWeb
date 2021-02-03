import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService,
    private toastr: ToastrService
    ) {
      this.form = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {

  }

  me() {
    this.apiService.me()
      .subscribe(user => {
        this.storeService.setUser(user);
      });
  }

  disconnect() {
    console.log("disconnect")
    this.storeService.setUser(null);
    this.storeService.setToken('');
  }

  connect() {
    console.log("connect")
    this.apiService.signin(this.form.controls['email'].value, this.form.controls['password'].value).
    subscribe(result => {
      console.log(result)
      if (result && result.token) {
        this.storeService.setToken(result.token);
        this.me();
      } else {
        if (result.error.message) {
          this.toastr.error(result.error.message);
        } else {
          this.toastr.error(result.error);
        }
      }
    });
  }
}
