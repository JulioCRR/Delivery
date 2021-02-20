package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.websocket;


import java.util.List;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;

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
