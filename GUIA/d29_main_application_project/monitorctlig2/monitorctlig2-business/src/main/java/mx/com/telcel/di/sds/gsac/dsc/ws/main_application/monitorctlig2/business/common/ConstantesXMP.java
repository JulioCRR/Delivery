package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common;

public abstract class ConstantesXMP {

    /*
	 * Nombre de los de los servicios que se operan
<<<<<<< .mine
	 */
	public static final String REACTIVACION = "REACTIVACION";	
	public static final String SUSPENSION 	= "SUSPENSION";	
	public static final String LIBERAIMEI 	= "LIBERAIMEI";
	public static final String[] REGIONES={"1","2","3","4","5","6","7","8","9"};
	public static final String ALL_REGIONS="ALL_REGIONS";
	
	/*
	 * Motivos de Reactivacion / Suspension
	 */
	public static final String REACT_X_SUPET 		= "SUPET";	
	public static final String REACT_X_ROEXT 		= "ROEXT";	
	public static final String REACT_X_ROEXT_ESNLI 	= "ESNLI";
	public static final String REACT_X_ROEXT_CAMRP 	= "CAMRP";
	
	
	/*
	 *  Servicios Internos
     */
    public static final String MONITOREO = "MONITOREO";
    public static final String COMENTARIOS = "COMENTARIOS";
    public static final String NOTIFICACION = "NOTIFICACION";

    /*
	 * Estatus de las operaciones
     */
    public static final String ST_EXITO = "EX";
    public static final String ST_NUEVO = "NU";
    public static final String ST_COMPLETO = "COMPLETO";

    /*
	 * Parametros
     */
    public static final String USUARIO = "usuario";

    /*
	 * Variables de evaluacion de respuesta.
     */
    public static final int COD_ERROR = -1;
    public static final int COD_PENDIENTE = 1;
    public static final int COD_REINTENTO = 2;
    public static final String REINTENTABLE = "REINTENTABLE";
    public static final String EXITO = "EXITO";
    public static final String NO_REINTENTABLE = "NO_REINTENTABLE";
    public static final String ERROR = "ERROR";
    public static final String PENDIENTE = "PENDIENTE";
    public static final String REINTENTO = "REINTENTO";

}
