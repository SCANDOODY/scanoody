import { Component, OnInit, Input } from '@angular/core';
import { FilterItem } from '../../models/filter-item.model';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FilterItemControl } from '../../enums/filter-item-controls.enum';
import { InputControlType } from '../../enums/input-control-type.enum';
import { of } from 'rxjs';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {
  private _model: FilterItem;
  fields = [];
  @Input() set filterModel(model: FilterItem) {
    this._model = model;
    this.fields = [{ text: 'Category', value: model.categoryFilter.field },
    { text: 'Name', value: model.nameFilter.field },
    { text: 'Company', value: model.companyFilter.field }];
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([this.formBuilder.group({
        field: [this.fields[0].value, RxwebValidators.unique()],
        operator: [null, Validators.required],
        value: [null, Validators.required],
        refArr: [this.fields]
      })])
    });
    this.items = this.form.get('items') as FormArray;
  }
  form: FormGroup;
  items: FormArray;
  inputType = InputControlType;
  isAllItemSelected = false;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([this.formBuilder.group({
        field: ['', RxwebValidators.unique()],
        operator: [null, Validators.required],
        value: [null, Validators.required],
        refArr: [this.fields]
      })])
    });
  }

  ngOnInit() {
  }
  createItem(): FormGroup {
    const j = this.form.get('items') as FormArray;
    const re = this.fields.filter(f => j.value.findIndex(x => x.field === f.value) < 0);
    this.isAllItemSelected = re.length === 1;
    j.controls.forEach(ctrl => {
      const index = ctrl.get('refArr').value.findIndex(x => x.value === re[0].value);
      if (index !== -1) {
        const ar = ctrl.get('refArr').value.filter(y => y.value !== re[0].value);
        ctrl.get('refArr').setValue(ar);
        ctrl.updateValueAndValidity();
      }
    });
    return this.formBuilder.group({
      field: [re[0].value, RxwebValidators.unique()],
      operator: [null, Validators.required],
      value: [null, Validators.required],
      refArr: [re]
    });
  }
  addItem(): void {
    this.items.push(this.createItem());
  }
  removeItem(index: number): void {
    if (this.items.length === 1) {
      return;
    }
    this.isAllItemSelected = this.items.length === 1;

    const ctrlValue = this._getControlValue(index).refArr.find(x => x.value === this._getControlValue(index).field);
    this.items.removeAt(index);
    this.items.controls.forEach(ctrl => {
      const val = ctrl.get('refArr').value;
      ctrl.get('refArr').setValue([...val, ctrlValue]);
      ctrl.get('refArr').updateValueAndValidity();
    });
  }
  private _getControlValue = (index: number) => this.items.controls[index].value;
  getOperators(fieldType: FilterItemControl) {
    switch (fieldType) {
      case FilterItemControl.category:
        return this._model.categoryFilter.filterOperations.filterOperationSet;
      case FilterItemControl.name:
        return this._model.nameFilter.filterOperations.filterOperationSet;
      case FilterItemControl.company:
        return this._model.companyFilter.filterOperations.filterOperationSet;
      default:
        break;
    }
  }
  getControlType(fieldType: FilterItemControl) {
    switch (fieldType) {
      case FilterItemControl.category:
        return this._model.categoryFilter.control.type;
      case FilterItemControl.name:
        return this._model.nameFilter.control.type;
      case FilterItemControl.category:
        return this._model.companyFilter.control.type;
      default:
        break;
    }
  }
  getdropdownOpt(fieldType: FilterItemControl) {
    if (fieldType === FilterItemControl.category) {
      return this._model.categoryFilter.control.options$;
    }
    return of([]);
  }
  clearControlAt(formGrp: FormGroup, i: number) {
    formGrp.controls.operator.setValue(null);
    formGrp.controls.value.setValue(null);
    formGrp.updateValueAndValidity();
    const newArr = [...this.items.controls].splice(i, 1);
    const index = newArr.findIndex(x => x.value.field === formGrp.controls.field.value);
    if (index !== -1) {
      newArr.splice(index, 1);

    }
  }
}
