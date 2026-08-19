package vn.pes.auth.security;

import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.pes.user.Account;
import vn.pes.user.SystemRole;
import vn.pes.user.repository.AccountRepository;

@Service
public class AccountUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public AccountUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));
        return new AccountAuthenticationUserDetails(
                account.getId(),
                account.getUsername(),
                account.getPasswordHash(),
                account.getRole(),
                List.of(new SimpleGrantedAuthority(toAuthority(account.getRole()))),
                Boolean.TRUE.equals(account.getIsActive()));
    }

    static String toAuthority(SystemRole role) {
        return "ROLE_" + role.name();
    }
}
