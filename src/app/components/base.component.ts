import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
})
export class BaseComponent implements OnInit {
    ngOnInit() {    
    }
    
    extractValues(mappings) {
        return Object.keys(mappings);
    }

    getNumericCellEditor() {
        function isCharNumeric(charStr) {
            return !!/\d/.test(charStr);
        }
        function isKeyPressedNumeric(event) {
            var charCode = getCharCodeFromEvent(event);
            var charStr = String.fromCharCode(charCode);
            return isCharNumeric(charStr);
        }
        function getCharCodeFromEvent(event) {
            event = event || window.event;
            return typeof event.which === "undefined" ? event.keyCode : event.which;
        }
        function NumericCellEditor() {}
        NumericCellEditor.prototype.init = function(params) {
            this.focusAfterAttached = params.cellStartedEdit;
            this.eInput = document.createElement("input");
            this.eInput.style.width = "100%";
            this.eInput.style.height = "100%";
            this.eInput.value = isCharNumeric(params.charPress) ? params.charPress : params.value;
            var that = this;
            this.eInput.addEventListener("keypress", function(event) {
                if (!isKeyPressedNumeric(event)) {
                    that.eInput.focus();
                    if (event.preventDefault) event.preventDefault();
                }
            });
        };
        NumericCellEditor.prototype.getGui = function() {
            return this.eInput;
        };
        NumericCellEditor.prototype.afterGuiAttached = function() {
            if (this.focusAfterAttached) {
            this.eInput.focus();
            this.eInput.select();
            }
        };
        NumericCellEditor.prototype.isCancelBeforeStart = function() {
            return this.cancelBeforeStart;
        };
        NumericCellEditor.prototype.isCancelAfterEnd = function() {};
        NumericCellEditor.prototype.getValue = function() {
            return this.eInput.value;
        };
        NumericCellEditor.prototype.focusIn = function() {
            var eInput = this.getGui();
            eInput.focus();
            eInput.select();
            console.log("NumericCellEditor.focusIn()");
        };
        NumericCellEditor.prototype.focusOut = function() {
            console.log("NumericCellEditor.focusOut()");
        };
        return NumericCellEditor;
    }

    getDatePicker() {
        function Datepicker() {}
        Datepicker.prototype.init = function(params) {
          this.eInput = document.createElement("input");
          this.eInput.value = params.value;
          $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
        };
        Datepicker.prototype.getGui = function() {
          return this.eInput;
        };
        Datepicker.prototype.afterGuiAttached = function() {
          this.eInput.focus();
          this.eInput.select();
        };
        Datepicker.prototype.getValue = function() {
          return this.eInput.value;
        };
        Datepicker.prototype.destroy = function() {};
        Datepicker.prototype.isPopup = function() {
          return false;
        };
        return Datepicker;
    }    

    getCurrentDate() {
        let now = new Date();
        console.log(now);
        let day = now.getDate();
        let month = now.getMonth()+1;
        let year = now.getFullYear();
        return day.toString().length == 1 ? "0"+day : day 
                + "/" + 
                (month.toString().length == 1 ? "0"+month : month) 
                + "/" + 
                year;
    }    

    getTime(datetime) {
        let hour = datetime.getHours(); 
        let minute = datetime.getMinutes();
        return (hour.toString().length == 1 ? "0"+hour : hour) 
        + ":" + 
        (minute.toString().length == 1 ? "0"+minute : minute);
    }     

    formatDateTime(datetime) {
        let day = datetime.getDate();
        let month = datetime.getMonth()+1;
        let year = datetime.getFullYear();
        let hour = datetime.getHours(); 
        let minute = datetime.getMinutes();
        return day.toString().length == 1 ? "0"+day : day 
                + "/" + 
                (month.toString().length == 1 ? "0"+month : month) 
                + "/" + 
                year 
                + " " + 
                (hour.toString().length == 1 ? "0"+hour : hour) 
                + ":" + 
                (minute.toString().length == 1 ? "0"+minute : minute);
    }    

    formatDate(datetime) {
        let day = datetime.getDate();
        let month = datetime.getMonth()+1;
        let year = datetime.getFullYear();
        return (day.toString().length == 1 ? "0"+day : day)
                + "/" + 
                (month.toString().length == 1 ? "0"+month : month) 
                + "/" + 
                year;
    }   
    
    setTimeOnDatetime(datetime, time) {
        return new Date(
            datetime.getFullYear(), 
            datetime.getMonth(), 
            datetime.getDate(), 
            time.substring(0, 2), 
            time.substring(3, 5)
        );       
    }
}
