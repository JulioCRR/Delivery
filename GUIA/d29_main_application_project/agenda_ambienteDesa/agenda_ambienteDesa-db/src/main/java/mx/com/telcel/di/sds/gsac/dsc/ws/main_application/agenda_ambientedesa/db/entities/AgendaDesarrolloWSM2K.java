package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;

@Entity
@Table(name = "D29_AGENDA_DESARROLLO_WSM2K")
public class AgendaDesarrolloWSM2K implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @SequenceGenerator(name = "D29_AGENDA_WSM2K_SEQ", sequenceName = "D29_AGENDA_WSM2K_SEQ", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "D29_AGENDA_WSM2K_SEQ")
  @Column(name = "ID_FOLIO")
  private int idFolio;
  
  @NotNull
  @Size(max = 40)
  @Column(name = "NOM_PROYECTO")
  private String nomProyecto;
  
  @NotNull
  @Size(max = 250)
  @Column(name = "COMENTARIOS")
  private String comentarios;
  
  @NotNull
  @JoinColumn(name = "ID_USER", referencedColumnName = "ID")
  @ManyToOne(fetch = FetchType.EAGER)
  private Usuario idusuariobatch;
  
  @NotNull
  @Size(max = 7)
  @Column(name = "USUARIO_DESA")
  private String usuarioDesa;
  
  @NotNull
  @Column(name = "DIAS_RESERVADOS")
  private int diasReservado;
  
  @Column(name = "PERMISOS_ACTIVOS")
  private Short pActivos;
  
  @NotNull
  @Column(name = "TURNO")
  private Short pTurno;
  
  @OneToMany(mappedBy = "agenda", cascade = {CascadeType.REMOVE}, fetch = FetchType.EAGER)
  private List<PermisosDesarrolloWSM2K> permisos;
  
  @OneToMany(mappedBy = "agenda", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
  private List<FechasReservadas> fechasReservadas;
  
  public AgendaDesarrolloWSM2K() {}
  
  public AgendaDesarrolloWSM2K(int folio) {
    this.idFolio = folio;
  }
  
  public Usuario getIdusuariobatch() {
    return this.idusuariobatch;
  }
  
  public void setIdusuariobatch(Usuario idusuariobatch) {
    this.idusuariobatch = idusuariobatch;
  }
  
  public Short getpTurno() {
    return this.pTurno;
  }
  
  public void setpTurno(Short pTurno) {
    this.pTurno = pTurno;
  }
  
  public int getIdFolio() {
    return this.idFolio;
  }
  
  public void setIdFolio(int idFolio) {
    this.idFolio = idFolio;
  }
  
  public String getNomProyecto() {
    return this.nomProyecto;
  }
  
  public void setNomProyecto(String nomProyecto) {
    this.nomProyecto = nomProyecto;
  }
  
  public String getComentarios() {
    return this.comentarios;
  }
  
  public void setComentarios(String comentarios) {
    this.comentarios = comentarios;
  }
  
  public List<PermisosDesarrolloWSM2K> getPermisos() {
    return this.permisos;
  }
  
  public void setPermisos(List<PermisosDesarrolloWSM2K> permisos) {
    this.permisos = permisos;
  }
  
  public String getUsuarioDesa() {
    return this.usuarioDesa;
  }
  
  public void setUsuarioDesa(String usuarioDesa) {
    this.usuarioDesa = usuarioDesa;
  }
  
  public List<FechasReservadas> getDiasReservados() {
    return this.fechasReservadas;
  }
  
  public void setDiasReservados(List<FechasReservadas> diasReservados) {
    this.fechasReservadas = diasReservados;
  }
  
  public int getDiasReservado() {
    return this.diasReservado;
  }
  
  public void setDiasReservado(int diasReservado) {
    this.diasReservado = diasReservado;
  }
  
  public Short getpActivos() {
    return this.pActivos;
  }
  
  public void setpActivos(Short pActivos) {
    this.pActivos = pActivos;
  }
}
