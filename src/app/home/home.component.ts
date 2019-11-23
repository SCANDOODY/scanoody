import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  constructor(private readonly authSer: AuthService, private readonly router: Router) { }

  ngOnInit() {
    this.authSer.getUserState().subscribe(user => this.user = user);
  }
  logout(){
    this.authSer.logout();
  }
  signIn(){
    this.router.navigate(['login']);
  }
  registration(){
    this.router.navigate(['registration']);
  }
}
