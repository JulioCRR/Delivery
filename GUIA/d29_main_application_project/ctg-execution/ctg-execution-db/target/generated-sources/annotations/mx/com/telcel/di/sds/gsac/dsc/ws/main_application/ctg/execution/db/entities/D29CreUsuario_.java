package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29BitacoraEjecucionesCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreArea;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreOficina;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CrePuesto;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-02-17T22:29:56")
@StaticMetamodel(D29CreUsuario.class)
public class D29CreUsuario_ { 

    public static volatile SingularAttribute<D29CreUsuario, String> extension;
    public static volatile SingularAttribute<D29CreUsuario, Long> responsable;
    public static volatile ListAttribute<D29CreUsuario, D29SolicitudAmbienteCtg> d29SolicitudAmbienteCtgList1;
    public static volatile SingularAttribute<D29CreUsuario, Date> fechaAlta;
    public static volatile ListAttribute<D29CreUsuario, D29BitacoraEjecucionesCtg> d29BitacoraEjecucionesCtgList;
    public static volatile SingularAttribute<D29CreUsuario, D29CreArea> idArea;
    public static volatile ListAttribute<D29CreUsuario, D29CreUsuario> d29CreUsuarioList;
    public static volatile SingularAttribute<D29CreUsuario, String> aMaterno;
    public static volatile SingularAttribute<D29CreUsuario, D29CrePuesto> idPuesto;
    public static volatile SingularAttribute<D29CreUsuario, D29CreOficina> idOficina;
    public static volatile ListAttribute<D29CreUsuario, D29SolicitudAmbienteCtg> d29SolicitudAmbienteCtgList;
    public static volatile ListAttribute<D29CreUsuario, D29CreUsuario> d29CreUsuarioList2;
    public static volatile ListAttribute<D29CreUsuario, D29CreUsuario> d29CreUsuarioList1;
    public static volatile SingularAttribute<D29CreUsuario, String> aPaterno;
    public static volatile SingularAttribute<D29CreUsuario, String> nombre;
    public static volatile SingularAttribute<D29CreUsuario, String> password;
    public static volatile SingularAttribute<D29CreUsuario, String> correo;
    public static volatile SingularAttribute<D29CreUsuario, String> nEmpleado;
    public static volatile SingularAttribute<D29CreUsuario, Long> id;
    public static volatile SingularAttribute<D29CreUsuario, String> usuarioRed;
    public static volatile SingularAttribute<D29CreUsuario, D29CreUsuario> idUsuarioAlta;
    public static volatile SingularAttribute<D29CreUsuario, Long> status;

}