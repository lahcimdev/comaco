package pl.lahcimdev.comaco.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.customer.service.CustomerService;

@RestController
@RequestMapping("api/customer")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


}
