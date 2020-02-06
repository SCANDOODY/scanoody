import { InputControlType } from '../../enums/input-control-type.enum';
export class ControlBase<T>{
    value: T;
    touched: boolean;
    valid: boolean;
    readonly type: InputControlType;
    readonly required: boolean;
    constructor(type: InputControlType, value?: T) {
        this.type = type;
        this.touched = false;
        this.valid = true;
        this.value = value || undefined;
        this.required = false;
    }
    markAsTouched() {
        this.touched = true;
    }
}

