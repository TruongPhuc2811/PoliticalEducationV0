package vn.pes.auth.application;

import java.time.Clock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class RegistrationTimeConfiguration {

    @Bean
    Clock registrationClock() {
        return Clock.systemDefaultZone();
    }
}
