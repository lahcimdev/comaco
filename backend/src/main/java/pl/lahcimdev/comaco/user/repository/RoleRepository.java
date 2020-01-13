package pl.lahcimdev.comaco.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lahcimdev.comaco.user.domain.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
