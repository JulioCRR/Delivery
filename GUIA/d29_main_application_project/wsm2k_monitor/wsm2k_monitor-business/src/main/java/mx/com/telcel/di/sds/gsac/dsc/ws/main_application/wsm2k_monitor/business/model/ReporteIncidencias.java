package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;


import java.util.List;

public class ReporteIncidencias {

	private String content;
	private List<RespuestaError> errores;
	
    public ReporteIncidencias(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

	public List<RespuestaError> getErrores() {
		return errores;
	}

	public void setErrores(List<RespuestaError> errores) {
		this.errores = errores;
	}
	
	
}
