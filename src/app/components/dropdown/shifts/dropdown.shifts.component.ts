import { 
  Component, 
  ViewContainerRef, 
  OnInit, 
  Output,
  EventEmitter
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { Shift } from '../../../models/shift';
import { ShiftsService } from '../../../services/shifts/shifts.service';
 
@Component({
  selector: 'dropdown-shifts',  
  templateUrl: './dropdown.shifts.html',
})
export class DropdownShiftsComponent extends BaseComponent implements OnInit {
  items: Array<Shift> = [];
  @Output() changeEvent = new EventEmitter<string>();

  constructor(
    private shiftService: ShiftsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.shiftService.dropdown()
    .subscribe(
      result => {
        this.items = result;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });     
  }   

  public emitChangeValue(value: any) {
    this.changeEvent.emit(value);
  }   
}