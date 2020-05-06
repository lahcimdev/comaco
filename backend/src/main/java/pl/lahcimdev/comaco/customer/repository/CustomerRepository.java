package pl.lahcimdev.comaco.customer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import pl.lahcimdev.comaco.customer.domain.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUsername(String username);

    Page<Customer> findAllByCompanyNameContainingOrCompanyNipContaining(Pageable pageable,
                                                                        @Param(value = "companyName") String companyName,
                                                                        @Param(value = "companyNip")String companyNip);
}
