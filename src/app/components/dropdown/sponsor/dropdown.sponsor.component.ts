import { 
  Component, 
  ViewContainerRef, 
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { Sponsor } from '../../../models/sponsor';
import { SponsorService } from '../../../services/sponsor/sponsor.service';
 
@Component({
  selector: 'dropdown-sponsor',  
  templateUrl: './dropdown.sponsor.html',
})
export class DropdownSponsorComponent extends BaseComponent implements OnInit {
  items: Array<Sponsor> = [];
  @Output() emitChangeEvent = new EventEmitter();

  constructor(
    private sponsorService: SponsorService,
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
    this.sponsorService.list()
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