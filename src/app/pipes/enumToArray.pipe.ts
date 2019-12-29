import { Pipe, PipeTransform } from "@angular/core";

/**
  * Usage: *ngFor="let item of roleEnum | enumToArray:'notIn = id do enum separado por virgula'"'
 **/
@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    //esta fixado pq nao da pra instalar o tradudtor com angular 5. isos ficara para quando
    //fizermos as melhorias no projeto
    private translate = {
        imediato: "Imediato",
        cincoMinutos: "5 minutos",
        dezMinutos: "10 minutos",
        trintaMinutos: "30 minutos",
    };

    constructor() { }

    private fncTranslate(key) {
        return this.translate[key];
    } 

    transform(data: Object, notIn: string = '') {
        const notIntList = notIn.split(',');        
        const keys = Object.keys(data);

        const enumList = keys.slice(0, keys.length / 2).map((key) => {
            //se passou notIn como parametro os itens em notIn, ficam nulos
            if (notIntList.indexOf(key) == -1)
                return { key: key, description: this.fncTranslate(data[key]) };
            else
                return null;
        })
        //aqui, retiro os itens nulos
        .filter(function (el) {
            return el != null;
        });

        return enumList;

        // return enumList.sort(function (a, b) {
        //     if (a.description > b.description) return 1;            
        //     if (a.description < b.description) return -1;        
        //     return 0;
        // });
    }
}