import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventComponent } from './components/event/event.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path:  '', component:  LoginComponent },
  { path:  'events', component:  EventComponent },
  { path:  'users/:nickname', component:  UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
