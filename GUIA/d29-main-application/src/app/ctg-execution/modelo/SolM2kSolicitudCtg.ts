import {User} from '../../admin/admin.service';

export class SolM2kSolicitudCtg {
    constructor(
        public id: number,
        public fecha_solicitud: Date,
        public hora_inicio: Date,
        public hora_fin: Date,
        public usuario: String,
        public total_transacciones: any,
        public transaccion: String,
        public proyectoAsociado: String,
        public comentarios: String,
        public solicitante: number,
        public responsableAutorizacion: number,
        public folioGenerado: String,
        public fechaHoraGeneracion: Date,
        public estatus: String,
        public ambiente: String,
        public programa: String,
    ) {}
}