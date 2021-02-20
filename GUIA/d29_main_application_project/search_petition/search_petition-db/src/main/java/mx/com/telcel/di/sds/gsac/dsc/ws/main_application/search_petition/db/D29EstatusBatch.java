
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author bermudezja
 */
@Entity
@Table(name = "D29_ESTATUS_BATCH")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "D29EstatusBatch.findAll", query = "SELECT d FROM D29EstatusBatch d"),
    @NamedQuery(name = "D29EstatusBatch.findById", query = "SELECT d FROM D29EstatusBatch d WHERE d.id = :id"),
    @NamedQuery(name = "D29EstatusBatch.findByMensajeBatch", query = "SELECT d FROM D29EstatusBatch d WHERE d.mensajeBatch = :mensajeBatch"),
    @NamedQuery(name = "D29EstatusBatch.findByDescripcion", query = "SELECT d FROM D29EstatusBatch d WHERE d.descripcion = :descripcion")})
public class D29EstatusBatch implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Short id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "MENSAJE_BATCH")
    private String mensajeBatch;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "estatusPet")
    private List<D29ConPeticionBatch> d29ConPeticionBatchList;

    public D29EstatusBatch() {
    }

    public D29EstatusBatch(Short id) {
        this.id = id;
    }

    public D29EstatusBatch(Short id, String mensajeBatch, String descripcion) {
        this.id = id;
        this.mensajeBatch = mensajeBatch;
        this.descripcion = descripcion;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getMensajeBatch() {
        return mensajeBatch;
    }

    public void setMensajeBatch(String mensajeBatch) {
        this.mensajeBatch = mensajeBatch;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @XmlTransient
    public List<D29ConPeticionBatch> getD29ConPeticionBatchList() {
        return d29ConPeticionBatchList;
    }

    public void setD29ConPeticionBatchList(List<D29ConPeticionBatch> d29ConPeticionBatchList) {
        this.d29ConPeticionBatchList = d29ConPeticionBatchList;
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
        if (!(object instanceof D29EstatusBatch)) {
            return false;
        }
        D29EstatusBatch other = (D29EstatusBatch) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29EstatusBatch[ id=" + id + " ]";
    }
    
}
