import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  nickname: string;
  user: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
    ) {

    }

  ngOnInit() {
    this.navigationService.setPageTitle("Pilot");

    this.route.params.subscribe(params => {
      if (params['nickname']) {
        this.nickname = params['nickname'];
        this.apiService.getUserInfoByNickname(this.nickname)
        .subscribe(user => {
          this.user = user;
          this.user.ratio = this.user.race_count / this.user.vicotry_count;
        });
      }
    });
  }

  getGrade(ratio: number): string {
    let grade = 'F';
    switch (true) {
      case (ratio<0.05):
        grade = 'F';
        break;
      case (ratio<0.10):
        grade = 'E';
        break
      case (ratio<0.15):
        grade = 'D';
        break
      case (ratio<0.20):
        grade = 'C';
        break
      case (ratio<0.30):
        grade = 'B';
        break
      case (ratio>=0.4):
        grade = 'A';
        break
      
    }
    return grade;

  }
}
