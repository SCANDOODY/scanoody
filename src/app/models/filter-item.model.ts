import { FIlterOperationBag } from './filter-operation-bag';
import { FilterOperation } from '../enums/filter-operation.enum';
import { SelectOptionControl } from './controls/select-options-control';
import { FilterItemControl } from '../enums/filter-item-controls.enum';
import { InputControl } from './controls/input-control';
import { Observable } from 'rxjs';

export class FilterItem {
    private _categoryFilterBag: FIlterOperationBag;
    private _nameFilterBag: FIlterOperationBag;
    private _companyNameBag: FIlterOperationBag;
    private _categoryFilterOptions: { filterOperations: FIlterOperationBag, control: SelectOptionControl<{ text: string, value: string }[]>, field: FilterItemControl };
    private _nameFilterOptions: { filterOperations: FIlterOperationBag, control: InputControl, field: FilterItemControl };
    private _companyFilterOptions: { filterOperations: FIlterOperationBag, control: InputControl, field: FilterItemControl };
    constructor() {
        this._categoryFilterBag = new FIlterOperationBag([FilterOperation.EQUAL, FilterOperation.NOTEQUAL]);
        this._nameFilterBag = new FIlterOperationBag([FilterOperation.EQUAL, FilterOperation.NOTEQUAL, FilterOperation.CONTAINS, FilterOperation.STARTSWITH]);
        this._companyNameBag = new FIlterOperationBag([FilterOperation.EQUAL, FilterOperation.NOTEQUAL, FilterOperation.CONTAINS, FilterOperation.STARTSWITH]);
        this._categoryFilterOptions = {
            filterOperations: this._categoryFilterBag,
            control: new SelectOptionControl(),
            field: FilterItemControl.category
        }
        this._nameFilterOptions = {
            filterOperations: this._nameFilterBag,
            control: new InputControl(),
            field: FilterItemControl.name
        }
        this._companyFilterOptions = {
            filterOperations: this._companyNameBag,
            control: new InputControl(),
            field: FilterItemControl.company
        }
    }
    get categoryFilter() {
        return this._categoryFilterOptions;
    }
    set categoryFilterOptions(option: Observable<{ text: string, value: string }[]>) {
        this._categoryFilterOptions.control.setOption$(option);
    }
    get nameFilter() {
        return this._nameFilterOptions;
    }
    get companyFilter() {
        return this._companyFilterOptions;
    }
}