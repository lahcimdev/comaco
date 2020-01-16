package pl.lahcimdev.comaco.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lahcimdev.comaco.customer.domain.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUsername(String username);

}
