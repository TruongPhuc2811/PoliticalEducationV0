package vn.pes.auth.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.pes.user.Account;
import vn.pes.user.AccountClassification;
import vn.pes.user.SystemRole;
import vn.pes.user.repository.AccountRepository;

class DaoAuthenticationProviderTest {

    private final AccountRepository accountRepository = mock(AccountRepository.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final Account activeAccount = mock(Account.class);
    private AccountUserDetailsService accountUserDetailsService;
    private AuthenticationManager authenticationManager;

    @BeforeEach
    void setUp() {
        accountUserDetailsService = new AccountUserDetailsService(accountRepository);
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(accountUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        authenticationManager = new ProviderManager(provider);
        when(passwordEncoder.encode(anyString())).thenReturn("{bcrypt}timing-attack-placeholder");

        when(activeAccount.getId()).thenReturn(123L);
        when(activeAccount.getUsername()).thenReturn("known-user");
        when(activeAccount.getPasswordHash()).thenReturn("{bcrypt}stored-hash");
        when(activeAccount.getRole()).thenReturn(SystemRole.USER);
        when(activeAccount.getIsActive()).thenReturn(true);
        when(accountRepository.findByUsername("known-user")).thenReturn(Optional.of(activeAccount));
    }

    @Test
    void authenticatesActiveUserThroughStandardProviderAndErasesCredentials() {
        when(passwordEncoder.matches("raw-password", "{bcrypt}stored-hash")).thenReturn(true);

        Authentication result = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated("known-user", "raw-password"));

        verify(passwordEncoder).matches("raw-password", "{bcrypt}stored-hash");
        AccountAuthenticationUserDetails principal = (AccountAuthenticationUserDetails) result.getPrincipal();
        assertThat(principal.getAccountId()).isEqualTo(123L);
        assertThat(principal.getUsername()).isEqualTo("known-user");
        assertThat(principal.getRole()).isEqualTo(SystemRole.USER);
        assertThat(principal.getAuthorities()).extracting(authority -> authority.getAuthority())
                .containsExactly("ROLE_USER");
        assertThat(result.getCredentials()).isNull();
        assertThat(principal.getPassword()).isNull();
        assertThat(principal).hasToString(
                "AccountAuthenticationUserDetails[accountId=123, username=known-user, role=USER, enabled=true]");
    }

    @Test
    void mapsAdminAndSuperAdminRolesDeterministically() {
        when(activeAccount.getRole()).thenReturn(SystemRole.ADMIN);
        assertThat(accountUserDetailsService.loadUserByUsername("known-user").getAuthorities())
                .extracting(authority -> authority.getAuthority())
                .containsExactly("ROLE_ADMIN");

        when(activeAccount.getRole()).thenReturn(SystemRole.SUPER_ADMIN);
        assertThat(accountUserDetailsService.loadUserByUsername("known-user").getAuthorities())
                .extracting(authority -> authority.getAuthority())
                .containsExactly("ROLE_SUPER_ADMIN");
    }

    @Test
    void unknownUsernameUsesUserNotFoundSemanticsInLoaderAndFailsAuthentication() {
        assertThatThrownBy(() -> accountUserDetailsService.loadUserByUsername("unknown-user"))
                .isInstanceOf(UsernameNotFoundException.class);
        assertThatThrownBy(() -> authenticationManager.authenticate(
                        UsernamePasswordAuthenticationToken.unauthenticated("unknown-user", "raw-password")))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void rejectsWrongPasswordThroughStandardProvider() {
        when(passwordEncoder.matches("wrong-password", "{bcrypt}stored-hash")).thenReturn(false);

        assertThatThrownBy(() -> authenticationManager.authenticate(
                        UsernamePasswordAuthenticationToken.unauthenticated("known-user", "wrong-password")))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void rejectsInactiveAccountThroughStandardAccountStatusCheck() {
        when(activeAccount.getIsActive()).thenReturn(false);

        assertThatThrownBy(() -> authenticationManager.authenticate(
                        UsernamePasswordAuthenticationToken.unauthenticated("known-user", "raw-password")))
                .isInstanceOf(DisabledException.class);
    }

    @Test
    void doesNotTurnClassificationIntoAnAuthority() {
        when(activeAccount.getClassification()).thenReturn(AccountClassification.CAN_BO);

        assertThat(accountUserDetailsService.loadUserByUsername("known-user").getAuthorities())
                .extracting(authority -> authority.getAuthority())
                .containsExactly("ROLE_USER");
    }
}
