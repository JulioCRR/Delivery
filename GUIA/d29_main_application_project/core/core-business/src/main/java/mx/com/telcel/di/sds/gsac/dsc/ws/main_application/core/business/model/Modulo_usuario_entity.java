package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.model;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.ModuloUsuario;

/**
 *
 * @author Roberto Sánchez 
 */
public class Modulo_usuario_entity {
public int id;
public String nEmpleado;
public String nombre;
public String aPaterno;
public String aMaterno;
public String correo;
public String usuarioRed;
public String extension;
public String area;
public String oficina;
public String puesto;
public String responsable;
public String password;
public String modulos[];
public String Justificacion;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



    public String getnEmpleado() {
        return nEmpleado;
    }

    public void setnEmpleado(String nEmpleado) {
        this.nEmpleado = nEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getaPaterno() {
        return aPaterno;
    }

    public void setaPaterno(String aPaterno) {
        this.aPaterno = aPaterno;
    }

    public String getaMaterno() {
        return aMaterno;
    }

    public void setaMaterno(String aMaterno) {
        this.aMaterno = aMaterno;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
    
    
    public String getUsuarioRed() {
        return usuarioRed;
    }

    public void setUsuarioRed(String usuarioRed) {
        this.usuarioRed = usuarioRed;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getOficina() {
        return oficina;
    }

    public void setOficina(String oficina) {
        this.oficina = oficina;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getJustificacion() {
        return Justificacion;
    }

    public void setJustificacion(String Justificacion) {
        this.Justificacion = Justificacion;
    }

    public String[] getModulos() {
        return modulos;
    }

    public void setModulos(String[] modulos) {
        this.modulos = modulos;
    }

    

    @Override
    public String toString() {
        return "Modulo_usuario_entity{" + "id=" + id + ", nEmpleado=" + nEmpleado + ", nombre=" + nombre + ", aPaterno=" + aPaterno + ", aMaterno=" + aMaterno + ", correo=" + correo + ", usuarioRed=" + usuarioRed + ", extension=" + extension + ", area=" + area + ", oficina=" + oficina + ", puesto=" + puesto + ", responsable=" + responsable + ", password=" + password + ", Justificacion=" + Justificacion + '}';
    }
    
    



    
}
