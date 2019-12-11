import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/injectables/item.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  vr$: Observable<any>;
  units$: Observable<any>;
  user: firebase.User;
  constructor(private readonly fb: FormBuilder, private service: ItemService, private router: Router, private authService: AuthService) {
    this.vr$ = this.service.getCategory();
    this.units$ = this.service.getUnits();
    this.authService.getUserState().subscribe(user => this.user = user);
    // this.vr$.subscribe(va=>console.log(va))
  }

  ngOnInit() {
    this.addItemForm = this.fb.group({
      name: null,
      company: null,
      quantity: null,
      expiry: null,
      category: null,
      measureIn: null,
      userId: null
    });
  }
  addItem() {
    if (!this.user) {
      throw new Error('User must be authenicated');
    }
    this.addItemForm.get('userId').setValue(this.user.uid);
    this.service.addItem(this.addItemForm.value).then(() => {
      this.router.navigate(['home/dashboard']);
    });
  }
}
