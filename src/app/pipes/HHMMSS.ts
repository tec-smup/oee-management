import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'HHMMSS'
})
export class HHMMSSPipe implements PipeTransform {
    transform(minutes : string) : string {
        let seconds = (parseInt(minutes))*60;
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
}