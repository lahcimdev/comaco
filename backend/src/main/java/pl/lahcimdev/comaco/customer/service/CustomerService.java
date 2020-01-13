package pl.lahcimdev.comaco.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.customer.repository.CustomerRepository;

import javax.persistence.EntityNotFoundException;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


}
