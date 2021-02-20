/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.repository;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.History;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Qualifier(value = "entityManagerFactory")
@RepositoryRestResource(collectionResourceRel = "history", path = "history")
public interface HistoryRepository extends PagingAndSortingRepository<History, Long> {

    List<History> findByStatus(@Param("status") HistoryStatus status);
}
