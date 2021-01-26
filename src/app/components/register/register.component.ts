import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    public storeService: StoreService
    ) {
      this.form = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        nickname: new FormControl('', Validators.required),
      });
    }

  ngOnInit() {
    /*this.apiService.me()
      .subscribe(user => {
        this.storeService.setUser(user);
      });*/
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
    console.log("register", this.form.controls['email'].value, this.form.controls['password'].value, this.form.controls['nickname'].value)
    this.apiService.register(this.form.controls['email'].value, this.form.controls['password'].value, this.form.controls['nickname'].value).
    subscribe(result => {
      if (result.token) {
        this.storeService.setToken(result.token);
        this.me();
      }
    });
  }
}
