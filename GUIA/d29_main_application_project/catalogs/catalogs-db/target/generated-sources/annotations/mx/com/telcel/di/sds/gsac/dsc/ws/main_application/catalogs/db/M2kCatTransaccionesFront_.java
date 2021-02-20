package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kRelAccionTransaccionFront;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-02-17T22:29:49")
@StaticMetamodel(M2kCatTransaccionesFront.class)
public class M2kCatTransaccionesFront_ { 

    public static volatile SingularAttribute<M2kCatTransaccionesFront, String> nombrePantalla;
    public static volatile SingularAttribute<M2kCatTransaccionesFront, String> descripcion;
    public static volatile CollectionAttribute<M2kCatTransaccionesFront, M2kRelAccionTransaccionFront> m2kRelAccionTransaccionFrontCollection;
    public static volatile SingularAttribute<M2kCatTransaccionesFront, String> transaccion;
    public static volatile SingularAttribute<M2kCatTransaccionesFront, String> responsableM2k;
    public static volatile SingularAttribute<M2kCatTransaccionesFront, String> correspondencia;
    public static volatile SingularAttribute<M2kCatTransaccionesFront, Integer> id;

}