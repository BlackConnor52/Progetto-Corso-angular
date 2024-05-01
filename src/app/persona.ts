export class Persona {
    public id:number;
    public nome:string;
    public cognome:string
    public luogoDiNascita:string
    public dataDiNascita:Date;
    public sesso:string;
    public constructor(){
        this.id=0;
        this.nome="";
        this.cognome="";
        this.luogoDiNascita="";
        this.dataDiNascita=new Date();
        this.sesso="";
    }
}
