import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { StoreService } from './services/store.service';
import { ApiService } from './services/api.service';
import { TracksComponent } from './components/tracks/tracks.component';
import { RacesComponent } from './components/races/races.component';
import { BestLapsComponent } from './components/best-laps/best-laps.component';
import { TrackBestLapsComponent } from './components/track-best-laps/track-best-laps.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TrackRankingComponent } from './components/track-ranking/track-ranking.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TracksComponent,
    RacesComponent,
    BestLapsComponent,
    TrackBestLapsComponent,
    RegisterComponent,
    TrackRankingComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [Router]
   },
   StoreService,
   ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
