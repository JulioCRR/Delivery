package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreArea;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2021-02-17T22:29:56")
@StaticMetamodel(D29CreArea.class)
public class D29CreArea_ { 

    public static volatile SingularAttribute<D29CreArea, String> clave;
    public static volatile ListAttribute<D29CreArea, D29CreUsuario> d29CreUsuarioList;
    public static volatile ListAttribute<D29CreArea, D29CreArea> d29CreAreaList;
    public static volatile SingularAttribute<D29CreArea, D29CreArea> idAreaPadre;
    public static volatile SingularAttribute<D29CreArea, Long> id;
    public static volatile SingularAttribute<D29CreArea, String> nombre;

}