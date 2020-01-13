package pl.lahcimdev.comaco.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lahcimdev.comaco.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
