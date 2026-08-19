package vn.pes.auth.security;

import java.util.Collection;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vn.pes.user.SystemRole;

final class AccountAuthenticationUserDetails implements UserDetails, CredentialsContainer {

    private final Long accountId;
    private final String username;
    private String passwordHash;
    private final SystemRole role;
    private final Collection<? extends GrantedAuthority> authorities;
    private final boolean enabled;

    AccountAuthenticationUserDetails(
            Long accountId,
            String username,
            String passwordHash,
            SystemRole role,
            Collection<? extends GrantedAuthority> authorities,
            boolean enabled) {
        this.accountId = accountId;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
        this.authorities = authorities;
        this.enabled = enabled;
    }

    Long getAccountId() {
        return accountId;
    }

    SystemRole getRole() {
        return role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public void eraseCredentials() {
        passwordHash = null;
    }

    @Override
    public String toString() {
        return "AccountAuthenticationUserDetails[accountId=" + accountId
                + ", username=" + username
                + ", role=" + role
                + ", enabled=" + enabled + "]";
    }
}
