
export class PeticionWS {
    constructor(
        public user:number,
        public telefono: string,
        public ip: string,
        public region: string,
        public usuario: string,
        public transaccion: string,
        public fechaInicio: Date,
        public horaInicio: Date,
        public horaFinal: Date,
       
     ) {}
}