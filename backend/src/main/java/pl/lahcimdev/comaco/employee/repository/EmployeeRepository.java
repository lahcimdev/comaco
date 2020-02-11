package pl.lahcimdev.comaco.employee.repository;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import pl.lahcimdev.comaco.employee.domain.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUsername(String username);

    Page<Employee> findAllByLastNameContainingOrFirstNameContaining(Pageable pageable,
                                                                    @Param("lastname") String firstName,
                                                                    @Param("firstname") String lastName);

}
