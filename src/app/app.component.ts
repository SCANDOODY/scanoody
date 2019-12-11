import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scanoody';
  user: firebase.User;
  constructor(private readonly authService: AuthService) {
    this.authService.getUserState().subscribe(user => this.user = user);
  }
}
