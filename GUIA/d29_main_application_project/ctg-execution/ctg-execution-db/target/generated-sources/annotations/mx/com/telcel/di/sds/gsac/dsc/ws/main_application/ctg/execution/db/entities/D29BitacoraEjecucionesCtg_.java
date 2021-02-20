package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-02-17T22:29:56")
@StaticMetamodel(D29BitacoraEjecucionesCtg.class)
public class D29BitacoraEjecucionesCtg_ { 

    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, String> respuestaCtg;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, String> ambiente;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, String> cadenaEnviada;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, String> respuestaXml;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, Date> fechaEjecucion;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, D29CreUsuario> usuarioEjecucion;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, D29SolicitudAmbienteCtg> solicitudCtg;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, Integer> id;
    public static volatile SingularAttribute<D29BitacoraEjecucionesCtg, String> respuestaPrograma;

}