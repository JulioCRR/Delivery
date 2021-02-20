
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.repository;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.HistoryDetail;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Qualifier(value = "entityManagerFactory")
@RepositoryRestResource(collectionResourceRel = "historydetail", path = "history-detail")
public interface HistoryDetailRepository extends PagingAndSortingRepository<HistoryDetail, Long> {

    List<HistoryDetail> findByHistory(@Param("status") HistoryStatus status);

    @Query("SELECT s FROM HistoryDetail s where s.history.id = ?1 order by s.region asc")
    List<HistoryDetail> findByHistoryId(@Param("historyId") Long historyId);
}
