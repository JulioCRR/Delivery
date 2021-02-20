package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "D29_PERMISOS_DESARROLLO_WSM2K")
public class PermisosDesarrolloWSM2K implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @SequenceGenerator(name = "D29_PERMISOS_WSM2K_SEQ", sequenceName = "D29_PERMISOS_WSM2K_SEQ", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "D29_PERMISOS_WSM2K_SEQ")
  @Column(name = "ID")
  private Integer id;
  
  @NotNull
  @Size(max = 15)
  @Column(name = "IP_DESA")
  private String ipDesa;
  
  @NotNull
  @Size(max = 4)
  @Column(name = "TRANSACCION_DESA")
  private String transDesa;
  
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  @JoinColumn(name = "ID_FOLIO")
  private AgendaDesarrolloWSM2K agenda;
  
  public PermisosDesarrolloWSM2K(String ipDesa, String transDesa) {
    this.ipDesa = ipDesa;
    this.transDesa = transDesa;
  }
  
  public PermisosDesarrolloWSM2K(String ipDesa, String transDesa, int folio) {
    this.ipDesa = ipDesa;
    this.transDesa = transDesa;
    this.agenda.setIdFolio(folio);
  }
  
  public PermisosDesarrolloWSM2K() {}
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getIpDesa() {
    return this.ipDesa;
  }
  
  public void setIpDesa(String ipDesa) {
    this.ipDesa = ipDesa;
  }
  
  public String getTransDesa() {
    return this.transDesa;
  }
  
  public void setTransDesa(String transDesa) {
    this.transDesa = transDesa;
  }
  
  public AgendaDesarrolloWSM2K getAgenda() {
    return this.agenda;
  }
  
  public void setAgenda(AgendaDesarrolloWSM2K agenda) {
    this.agenda = agenda;
  }
  
  public String toString() {
    return "PermisosDesarrolloWSM2K{id=" + this.id + ", ipDesa=" + this.ipDesa + ", transDesa=" + this.transDesa + ", agenda=" + this.agenda + '}';
  }
}
