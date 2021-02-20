export class M2kCatTransaccion {
    constructor(
        public id: number,
        public transaccion: string,
        public nombrePantalla: string,
        public descripcion: string,
        public transaccionPantallaTransient: string,
        public responsableM2k: string,
        public correspondencia:string
    ) {}
}