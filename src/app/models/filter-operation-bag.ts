import { FilterOperation } from '../enums/filter-operation.enum';

export class FIlterOperationBag {
    private _filterOperationSet: { text: string, value: number }[];
    constructor(op: FilterOperation[]) {
        this._filterOperationSet = op.map(o => ({ text: FILTER_OP_MAPPING[o], value: o }));
    }
    get filterOperationSet() {
        return this._filterOperationSet;
    }
}
export const FILTER_OP_MAPPING = {
    [FilterOperation.AND]: 'And',
    [FilterOperation.BETWEEN]: 'Between',
    [FilterOperation.CONTAINS]: 'Contains',
    [FilterOperation.EQUAL]: 'Equal to',
    [FilterOperation.GREATERTHAN]: 'Greater than',
    [FilterOperation.GREATERTHANOREQUAL]: 'Greater than or equal',
    [FilterOperation.LESSTHAN]: 'Less than',
    [FilterOperation.LESSTHANOREQUAL]: 'Less than or equal',
    [FilterOperation.NOTEQUAL]: 'Not equal',
    [FilterOperation.OR]: 'Or',
    [FilterOperation.STARTSWITH]: 'Starts with',
}
