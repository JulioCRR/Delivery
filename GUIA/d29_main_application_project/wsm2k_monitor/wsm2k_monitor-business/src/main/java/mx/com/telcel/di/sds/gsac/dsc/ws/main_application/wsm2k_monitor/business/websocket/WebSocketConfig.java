package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");
		config.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		/*registry.addEndpoint("/incidencias").withSockJS();
		registry.addEndpoint("/tiempos").withSockJS();
		registry.addEndpoint("/comportamientoUsuarios").withSockJS();
		registry.addEndpoint("/estadoMonitoreo").withSockJS();
		registry.addEndpoint("/consumoServicios").withSockJS();
		registry.addEndpoint("/monitoreoInstancias").withSockJS();*/
                registry.addEndpoint("/incidencias").setAllowedOrigins("*").withSockJS();
		registry.addEndpoint("/tiempos").setAllowedOrigins("*").withSockJS();
		registry.addEndpoint("/comportamientoUsuarios").setAllowedOrigins("*").withSockJS();
		registry.addEndpoint("/estadoMonitoreo").setAllowedOrigins("*").withSockJS();
		registry.addEndpoint("/consumoServicios").setAllowedOrigins("*").withSockJS();
		registry.addEndpoint("/monitoreoInstancias").setAllowedOrigins("*").withSockJS();
		registry.addEndpoint("/pantallaOmega").setAllowedOrigins("*").withSockJS(); // AGREGADO PARA PANTALLA OMEGA
	}

	
	
	
}