import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class BaseService {
    constructor() {

    }   

    protected handleError(error: HttpErrorResponse) {
        let returnMessage = "";
        if (error.error instanceof ErrorEvent) {
          returnMessage = "Um erro ocorreu: ", error.error.message;
        } 
        else {
          let stringError = JSON.stringify(error);
          let objError = JSON.parse(stringError);

          //retornos:
          // 400 - validações de preenchimento e retornos do mysql
          // 401 - token invalido
          // 500 - exceção não tratada

          if(objError.status == 400) {
            let objBody = JSON.parse(objError._body);

            //retorno do mysql
            if(objBody.sqlMessage) {
              returnMessage += objBody.sqlMessage;
            }
            //retorno do nodejs
            else {
              returnMessage += "<ul>";
              objBody.forEach(item => {
                returnMessage += "<li>" + item.msg + "</li>"
              });
              returnMessage += "</ul>";              
            }
          }
          if(objError.status == 401) {
            returnMessage = objError._body;
          }
          //exceção. não vou mostrar o retorno do server mas vou deixar no console
          if(objError.status == 500) {
            returnMessage = ":( Parece que houve um erro de comunicação, tente daqui a pouco.";
          }          
        }

        return new ErrorObservable(returnMessage);
      };    
}