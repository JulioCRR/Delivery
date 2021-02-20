import { M2kCatAccion } from './M2kCatAccion';
import { M2kCatTransaccion } from './M2kCatTransaccion';

export class M2kRelAccionTransaccion {
    constructor(
        public accion: M2kCatAccion,
        public transaccion: M2kCatTransaccion,
        public request: string,
        public responseExitoso: string,
        public responseErrorEM2k: string,
        public responseErrorEMOB: string,
        public fechaCreacion: string,
        public fechaModificacion: string
    ) {}
}