import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataTransporterService {
    private _moduleDescription = new BehaviorSubject('');
    get description() {
        return this._moduleDescription.asObservable();
    }
    set moduleDescription(description: string) {
        this._moduleDescription.next(description);
    }
}
