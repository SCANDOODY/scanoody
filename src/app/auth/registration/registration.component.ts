import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  authError: any;
  registrationForm: FormGroup;
  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder) { }
  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: null,
      lastName: null,
      email: null,
      password: null
    });
    this.authService.authError$.subscribe((error) => {
      this.authError = error
    });
  }
  createUser() {
    this.authService.createUser(this.registrationForm.value).then();
  }
}
