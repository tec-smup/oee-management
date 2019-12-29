import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs';

@Injectable()
export class FilterService  {
	/*evento global para registrar a troca do filtro dwmy*/
    public onDWMYUpdate$: Subject<number>;
    public onCountdownUpdate$: Subject<boolean>;
    public onChannelUpdate$: Subject<number>;
    public onMachineUpdate$: Subject<string>;
    public onDateRangeUpdate$: Subject<Date[]>;

    constructor() {
        this.onDWMYUpdate$ = new Subject();
        this.onCountdownUpdate$ = new Subject();
        this.onChannelUpdate$ = new Subject();
        this.onMachineUpdate$ = new Subject();
        this.onDateRangeUpdate$ = new Subject();
    }

	public setDWMyFilter(filter: number): void {             
        this.onDWMYUpdate$.next(filter);
        this.setRefreshingCountdown(true);
    }
        
	public setChannelFilter(channelId: number): void {             
        this.onChannelUpdate$.next(channelId);
        this.setRefreshingCountdown(true);
    } 
    
	public setMachineFilter(machineCode: string): void {             
        this.onMachineUpdate$.next(machineCode);
        this.setRefreshingCountdown(true);
    }  
    
	public setDateRangeFilter(dates: Date[]): void {             
        this.onDateRangeUpdate$.next(dates);
        this.setRefreshingCountdown(true);
    }       
  
	public setRefreshingCountdown(refresh: boolean): void {             
        this.onCountdownUpdate$.next(refresh);
    }    
    
}