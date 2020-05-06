package pl.lahcimdev.comaco.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.customer.service.CustomerService;
import pl.lahcimdev.comaco.dto.basiccustomer.BasicCustomerDto;
import pl.lahcimdev.comaco.dto.customer.CustomerDto;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/customer")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/new")
    public Customer createCustomer(@RequestBody @Valid Customer customer) {
        return customerService.createCustomer(customer);
    }

    @PutMapping("/update")
    public Customer updateCustomer(@RequestBody CustomerDto customerDto) {
        return customerService.updateCustomer(customerDto);
    }

    @PostMapping("/{id}/photo")
    public void updateCustomerPhoto(@PathVariable Long id, @RequestBody String customerPhoto) {
        customerService.updateCustomerPhoto(id, customerPhoto);
    }

    @GetMapping("/{id}")
    public CustomerDto getCustomerDto(@PathVariable Long id) {
        return customerService.getCustomerDto(id);
    }

    @GetMapping("/list")
    public List<BasicCustomerDto> getBasicCustomerDtoList() {
        return customerService.getBasicCustomerDtoList();
    }

    @GetMapping("/page")
    public Page<BasicCustomerDto> getBasicCustomerDtoPage(@RequestParam int page, @RequestParam int size,
                                                          @RequestParam(defaultValue = "ASC", required = false) Sort.Direction sort,
                                                          @RequestParam(defaultValue = "id", required = false) String[] properties,
                                                          @RequestParam(defaultValue = "", required = false) String filter) {
        return customerService.getBasicCustomerDtoPage(PageRequest.of(page, size, sort, properties), filter);
    }


}
