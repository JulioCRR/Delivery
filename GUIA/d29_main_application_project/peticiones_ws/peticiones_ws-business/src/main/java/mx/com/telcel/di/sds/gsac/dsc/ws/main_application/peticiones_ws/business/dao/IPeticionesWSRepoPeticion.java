package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.dao;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Juan
 */
@Repository
public interface IPeticionesWSRepoPeticion extends PagingAndSortingRepository<Peticion, Long>, JpaSpecificationExecutor {

    @Override
    Page<Peticion> findAll(Specification spec, Pageable pageable);

    @Override
    List<Peticion> findAll(Specification spec);

}
