package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.d29_main_application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ImportResource("/spring-config.xml")
@EnableScheduling
@EnableJpaRepositories(basePackages = "mx.com.telcel.di.sds.gsac.dsc.ws.main_application")
@EnableAutoConfiguration
@EnableTransactionManagement
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

}
