package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import org.springframework.data.jpa.domain.Specification;

/**
 *
 * @author Juan
 */
public class PeticionSpecification implements Specification<Peticion> {

    private final Map<String, Object> criteria;
    private List<Predicate> filters;

    public PeticionSpecification(Map<String, Object> criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Peticion> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        if (criteria == null || criteria.isEmpty()) {
            return null;
        }
        filters = new ArrayList<>();
        for (Map.Entry<String, Object> entry : criteria.entrySet()) {
            if (root.get(entry.getKey()).getJavaType() == String.class) {
                if (entry.getValue().equals(Peticion.WILDCARD)) {
                    filters.add(cb.equal(root.<String>get(entry.getKey()), entry.getValue()));
                } else {
                    filters.add(cb.like(root.<String>get(entry.getKey()), "%" + entry.getValue() + "%"));
                }
            } else {
                filters.add(cb.equal(root.get(entry.getKey()), entry.getValue()));
            }
        }
        return cb.and(filters.toArray(new Predicate[filters.size()]));
    }

}
