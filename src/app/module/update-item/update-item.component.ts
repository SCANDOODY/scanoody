import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/injectables/item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  form: FormGroup;
  set item(i: any) {
    this.form.get('id').setValue(i.id);
    this.form.get('category').setValue(i.Category);
    this.form.get('quantity').setValue(i.Quantity);
  }
  vr$: Observable<any>;
  constructor(private readonly dialogRef: NbDialogRef<UpdateItemComponent>,
    private fb: FormBuilder,
    private readonly service: ItemService) {
    this.form = this.fb.group({
      id: null,
      category: null,
      quantity: null
    });
    this.vr$ = this.service.getCategory();
  }

  ngOnInit() {

  }
  close(){
    this.dialogRef.close();
  }
  updateItem(){
    this.service.updateItem(this.form.value).then();
    this.close();
  }
}
