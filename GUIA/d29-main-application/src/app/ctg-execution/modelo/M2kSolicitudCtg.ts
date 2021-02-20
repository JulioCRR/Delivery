import {User} from '../../admin/admin.service';

export class M2kSolicitudCtg {
    constructor(
        public id: number,
        public fecha_solicitud: Date,
        public hora_inicio: any,
        public hora_fin: any,
        public usuario: String,
        public total_transacciones: any,
        public transaccion: String,
        public proyectoAsociado: String,
        public comentarios: String,
        public solicitante: User,
        public responsableAutorizacion: User,
        public folioGenerado: String,
        public fechaHoraGeneracion: Date,
        public estatus: String,
        public programa: String,
        public countEjecuciones: number,
    ) {}
}