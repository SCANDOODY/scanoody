import { ControlBase } from './control-base';
import { InputControlType } from '../../enums/input-control-type.enum';

export class InputControl extends ControlBase<any>{
    constructor() {
        super(InputControlType.text);
    }
    setValue(value: any) {
        this.value = value;
    }
}
