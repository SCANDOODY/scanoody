import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/injectables/item.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  vr$: Observable<any>;
  units$: Observable<any>;
  constructor(private readonly fb: FormBuilder, private service: ItemService, private router: Router) {
    this.vr$ = this.service.getCategory();
    this.units$ = this.service.getUnits();
    // this.vr$.subscribe(va=>console.log(va))
  }

  ngOnInit() {
    this.addItemForm = this.fb.group({
      name: null,
      company: null,
      quantity: null,
      expiry: null,
      category: null,
      measureIn: null
    });
  }
  addItem() {
    this.service.addItem(this.addItemForm.value).then(() => {
      this.router.navigate(['dashboard']);
    });
  }
}
