import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { MachineShift } from "../../../models/machine.shift";
import { MachineShiftService } from "../../../services/machine.shift/machine.shift.service";

declare var $ :any;

@Component({
    selector: 'modal-shift',
    templateUrl: './shift.modal.component.html'
  })
   
  export class ShiftModalComponent implements OnInit {
    title: string;
    machineCode: string;
    shifts: Array<MachineShift> = [];
    machineShift: MachineShift = new MachineShift();
   
    constructor(
      private machineShiftService: MachineShiftService,
      public bsModalRef: BsModalRef,
      public toastr: ToastsManager,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
      this.machineShift.machineCode = this.machineCode;
      this.loadGrid();
    }

    loadGrid() {
      this.machineShiftService.list(this.machineShift.machineCode)
      .subscribe(
        result => {
          this.shifts = result;
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        });      
    }

    setHour(hour: string, who: string) {
      if(who === 'initial')
        this.machineShift.hourIni = hour;
      else  
        this.machineShift.hourFin = hour;
    }

    add() {
      // this.channelService.addMachine(this.channelMachine)
      // .subscribe(
      //   result => {
      //     this.loadGrid();
      //   },
      //   error => {
      //     this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      //   }
      // );  
    }

    delete(machineCode: string) {
      // this.channelMachine.machineCode = machineCode;

      // this.channelService.deleteMachine(this.channelMachine)
      // .subscribe(
      //   result => {
      //     this.loadGrid();
      //   },
      //   error => {
      //     this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      //   }
      // );          
    }
  }