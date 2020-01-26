package pl.lahcimdev.comaco.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.user.repository.UserRepository;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<Long> {

    private UserRepository userRepository;

    @Autowired
    public AuditorAwareImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<Long> getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username != null) {
            return userRepository.findByUsername(username)
                    .map(authenticatedUser -> authenticatedUser.getId());
        }
        return Optional.empty();
    }


}
