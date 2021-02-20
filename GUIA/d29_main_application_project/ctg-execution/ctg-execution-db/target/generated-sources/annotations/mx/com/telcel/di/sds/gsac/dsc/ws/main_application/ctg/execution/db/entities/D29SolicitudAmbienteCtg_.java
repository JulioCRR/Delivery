package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import java.math.BigInteger;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29BitacoraEjecucionesCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-02-17T22:29:56")
@StaticMetamodel(D29SolicitudAmbienteCtg.class)
public class D29SolicitudAmbienteCtg_ { 

    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> usuarioM2k;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, Date> fechaCaducidad;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, Date> fechaSolicitud;
    public static volatile ListAttribute<D29SolicitudAmbienteCtg, D29BitacoraEjecucionesCtg> d29BitacoraEjecucionesCtgList;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> ambiente;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, D29CreUsuario> solicitante;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> programa;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> horaInicio;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> proyectoAsociado;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, D29CreUsuario> responsableAutorizacion;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> horaFin;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, BigInteger> consecutivo;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> estatus;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> transaccion;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, Date> fechaAprobacion;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> folio;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, Date> fechaCreacion;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, Integer> id;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, BigInteger> numTotalTransacciones;
    public static volatile SingularAttribute<D29SolicitudAmbienteCtg, String> comentarios;

}