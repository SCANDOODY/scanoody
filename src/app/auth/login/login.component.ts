import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authError: any;
  loginForm: FormGroup;
  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: null,
      password: null
    });
    this.authService.authError$.subscribe((error) => {
      this.authError = error;
    });
  }
  login() {
    this.authService.signIn(this.loginForm.get('email').value, this.loginForm.get('password').value)
  }
}
