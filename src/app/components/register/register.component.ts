import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import * as countriesDB from 'src/data/countries.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  countries: any = (countriesDB as any).default;

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService,
    private toastr: ToastrService
    ) {
      this.form = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        nickname: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      });
    }

  ngOnInit() {

  }

  me() {
    console.log('me', this.storeService.getToken())
    
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

  register() {
    console.log("register", this.form.controls['email'].value, this.form.controls['password'].value, this.form.controls['nickname'].value, this.form.controls['country'].value.code)
    this.apiService.register(this.form.controls['email'].value, this.form.controls['password'].value, this.form.controls['nickname'].value, this.form.controls['country'].value.code).
    subscribe(result => {
      console.log(result)
      if (result.id) {
        this.toastr.info("User account created");
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
