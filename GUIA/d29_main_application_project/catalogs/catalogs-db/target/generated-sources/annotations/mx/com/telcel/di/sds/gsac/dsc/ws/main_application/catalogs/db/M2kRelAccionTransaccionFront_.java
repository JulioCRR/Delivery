package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatAccion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kRelAccionTransaccionFrontPK;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-02-17T22:29:49")
@StaticMetamodel(M2kRelAccionTransaccionFront.class)
public class M2kRelAccionTransaccionFront_ { 

    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, String> request;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, String> responseExitoso;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, String> responesErrorM2k;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, Date> fechaCreacion;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, M2kCatTransaccionesFront> m2kCatTransaccionesFront;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, M2kCatAccion> m2kCatAccion;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, String> responseErrorMob;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, M2kRelAccionTransaccionFrontPK> m2kRelAccionTransaccionFrontPK;
    public static volatile SingularAttribute<M2kRelAccionTransaccionFront, Date> fechaUltimaModificacion;

}