package vn.pes.common.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

class SecurityConfigTest {

    @Test
    void passwordEncoderUsesOneWayDelegatingEncoding() {
        PasswordEncoder passwordEncoder = new SecurityConfig().passwordEncoder();
        String rawPassword = "registration-test-password";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        assertThat(passwordEncoder).isNotNull();
        assertThat(encodedPassword).isNotEqualTo(rawPassword);
        assertThat(passwordEncoder.matches(rawPassword, encodedPassword)).isTrue();
    }

    @Test
    void securityConfigurationRetainsSessionCsrfAndLogoutBaselineWithoutBasicOrFormLogin() throws IOException {
        String configuration = Files.readString(
                Path.of("src/main/java/vn/pes/common/config/SecurityConfig.java"));

        assertThat(configuration).contains("DaoAuthenticationProvider");
        assertThat(configuration).contains("SessionCreationPolicy.IF_REQUIRED");
        assertThat(configuration).contains("sessionFixation(sessionFixation -> sessionFixation.changeSessionId())");
        assertThat(configuration).contains("invalidateHttpSession(true)");
        assertThat(configuration).doesNotContain("csrf.disable()");
        assertThat(configuration).doesNotContain(".httpBasic(");
        assertThat(configuration).doesNotContain(".formLogin(");
        assertThat(configuration).doesNotContain("STATELESS");
        assertThat(configuration).doesNotContain("spring-session");
        assertThat(configuration).doesNotContain("Redis");
    }
}
