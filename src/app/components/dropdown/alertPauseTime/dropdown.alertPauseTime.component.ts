import {Component, Input, Output, EventEmitter} from '@angular/core';
import { AlertPauseTime } from '../../../utils/enums/alert.pauseTime.enum';

@Component({
    selector: 'dropdown-alert-pause-time',
    templateUrl: './dropdown.alertPauseTime.component.html'
})
export class DropdownAlertPauseTimeComponent {
    
    @Input() notIn: string;
    @Output() emitChangeEvent: EventEmitter<number> = new EventEmitter();

    public pauseTime = AlertPauseTime;

    constructor() { }

    changeValue(pauseTimeKey: string) {
        this.emitChangeEvent.emit(parseInt(pauseTimeKey));
    }


}
