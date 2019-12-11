import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: firebase.User;
  constructor(private readonly authSer: AuthService, private readonly router: Router) { }

  ngOnInit() {
    this.authSer.getUserState().subscribe(user => this.user = user);
  }
  logout(){
    this.authSer.logout();
    this.router.navigate(['home']);
  }
  signIn(){
    this.router.navigate(['login']);
  }
  registration(){
    this.router.navigate(['registration']);
  }
}
