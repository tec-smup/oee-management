import { 
  Component, 
  ViewContainerRef, 
  OnInit,
  Input,  
  Output,
  EventEmitter
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { PauseReasonService } from '../../../services/pause.reason/pause.reason.service';
import { PauseReason } from '../../../models/pause.reason';
 
@Component({
  selector: 'dropdown-pause-reason',  
  templateUrl: './dropdown.pause.reason.html',
})
export class DropdownPauseReasonComponent extends BaseComponent implements OnInit {
  items: Array<PauseReason> = [];
  @Input() channelId: number;
  @Output() emitChangeEvent = new EventEmitter();

  constructor(
    private pauseReasonService: PauseReasonService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {
    this.load(this.channelId);
  }

  load(channelId: number) {
    this.pauseReasonService.dropdown(channelId)
    .subscribe(
      result => {
        this.items = result;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });     
  }   

  public emitChangeValue(value: any) {
    this.emitChangeEvent.emit(value);
  }   
}