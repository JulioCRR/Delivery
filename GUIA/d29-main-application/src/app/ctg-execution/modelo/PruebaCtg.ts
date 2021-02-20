
export class PruebaCtg {
    constructor(
        public usuario: String,
        public password: String,
        public programa: String,
        public region: String,
        public transaccion: String,
        public cadena: String,
        public ambiente: String,
        public codigoProduccion:String,
        public fhEjecucion:Date,
        public idUsuarioEjecucion:number,
        public idSolicitudEjecucion?:any,
    ) {}
}