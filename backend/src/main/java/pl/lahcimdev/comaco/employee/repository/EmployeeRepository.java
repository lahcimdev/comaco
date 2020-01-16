package pl.lahcimdev.comaco.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lahcimdev.comaco.employee.domain.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUsername(String username);

}
