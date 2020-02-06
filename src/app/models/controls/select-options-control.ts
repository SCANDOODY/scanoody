import { ControlBase } from './control-base';
import { Observable } from 'rxjs';
import { InputControlType } from '../../enums/input-control-type.enum';

export class SelectOptionControl<T> extends ControlBase<any>{
    options$: Observable<T>;
    constructor(options$?: Observable<T>) {
        super(InputControlType.dropdown);
        this.options$ = options$ || undefined;
    }
    setValue(value: any) {
        this.value = value;
    }
    setOption$(options$: Observable<T>) {
        this.options$ = options$;
    }
}