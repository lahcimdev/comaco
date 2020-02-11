package pl.lahcimdev.comaco.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username != null) {
            return Optional.of(username);
        }
        return Optional.empty();
    }


}
