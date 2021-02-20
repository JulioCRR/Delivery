package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.UserStatus;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter.JodaLocalDateTimeConverter;
import org.jasypt.util.password.BasicPasswordEncryptor;
import org.joda.time.LocalDateTime;

/**
 *
 * @author hernandezaa
 */
@Entity
@Table(name = DBConstants.DB_PREF_CORE + "usuario", uniqueConstraints = {
    @UniqueConstraint(name = "UNQ_N_EMPLEADO", columnNames = {"n_empleado"})})
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "USUARIO_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "USUARIO_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "USUARIO_SEQ")
    @Column(name = "id")
    private Integer id;
    @Column(name = "n_empleado")
    @JsonProperty("login")
    private String nEmpleado;
    @JsonIgnore
    @Column(name = "password")
    private String password;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "a_paterno")
    private String aPaterno;
    @Column(name = "a_materno")
    private String aMaterno;
    @Column(name = "correo")
    private String correo;
    @Column(name = "usuario_red")
    private String usuarioRed;
    @Column(name = "extension")
    private String extension;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<UsuarioPerfil> usuarioPerfilList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<UsuarioMenu> usuarioMenuList;
    @JsonIgnore
    @JoinColumn(name = "id_area", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Area area;
    @JsonIgnore
    @JoinColumn(name = "id_oficina", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Oficina oficina;
    @JsonIgnore
    @JoinColumn(name = "id_puesto", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Puesto puesto;
    @Column(name = "FECHA_ALTA")
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime fechaAlta;
    @Enumerated
    @Column(name = "STATUS")
    private UserStatus status;
    @Column(name="RESPONSABLE")
    private String responsable;

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }
    @JsonIgnore
    @JoinColumn(name = "id_usuario_alta", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuarioAlta;

    public String getnEmpleado() {
        return nEmpleado;
    }

    public void setnEmpleado(String nEmpleado) {
        this.nEmpleado = nEmpleado;
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

    public Usuario() {
    }

    public Usuario(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNEmpleado() {
        return nEmpleado;
    }

    public void setNEmpleado(String nEmpleado) {
        this.nEmpleado = nEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getAPaterno() {
        return aPaterno;
    }

    public void setAPaterno(String aPaterno) {
        this.aPaterno = aPaterno;
    }

    public String getAMaterno() {
        return aMaterno;
    }

    public void setAMaterno(String aMaterno) {
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

    public List<UsuarioPerfil> getUsuarioPerfilList() {
        return usuarioPerfilList;
    }

    public void setUsuarioPerfilList(List<UsuarioPerfil> usuarioPerfilList) {
        this.usuarioPerfilList = usuarioPerfilList;
    }

    public List<UsuarioMenu> getUsuarioMenuList() {
        return usuarioMenuList;
    }

    public void setUsuarioMenuList(List<UsuarioMenu> usuarioMenuList) {
        this.usuarioMenuList = usuarioMenuList;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Oficina getOficina() {
        return oficina;
    }

    public void setOficina(Oficina oficina) {
        this.oficina = oficina;
    }

    public Puesto getPuesto() {
        return puesto;
    }

    public void setPuesto(Puesto puesto) {
        this.puesto = puesto;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public LocalDateTime getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDateTime fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    @JsonIgnore
    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public Usuario getUsuarioAlta() {
        return usuarioAlta;
    }

    public void setUsuarioAlta(Usuario usuarioAlta) {
        this.usuarioAlta = usuarioAlta;
    }

    @JsonIgnore
    public String getNombreCompleto() {
        return "" + nombre + " " + aPaterno + " " + aMaterno;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Usuario)) {
            return false;
        }
        Usuario other = (Usuario) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

//    @Override
//    public String toString() {
//        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario[ id=" + id + " ]";
//    }

    @Override
    public String toString() {
        return "Usuario{" + "id=" + id + ", nEmpleado=" + nEmpleado + ", password=" + password + ", nombre=" + nombre + ", aPaterno=" + aPaterno + ", aMaterno=" + aMaterno + ", correo=" + correo + ", usuarioRed=" + usuarioRed + ", extension=" + extension + ", usuarioPerfilList=" + usuarioPerfilList + ", usuarioMenuList=" + usuarioMenuList + ", area=" + area + ", oficina=" + oficina + ", puesto=" + puesto + ", fechaAlta=" + fechaAlta + ", status=" + status + ", usuarioAlta=" + usuarioAlta + '}';
    }
    
    @PrePersist
    public void prePersist() {
        this.password = new BasicPasswordEncryptor().encryptPassword(password);
    }

}
