package vn.pes.common.config;

import static org.assertj.core.api.Assertions.assertThat;

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
}
