package pl.lahcimdev.comaco.dto.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.customer.repository.CustomerRepository;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.service.UserPhotoSize;

import javax.persistence.EntityNotFoundException;

@Component
public class CustomerDtoMapper {

    private CustomerRepository customerRepository;
    private UserPhotoService userPhotoService;

    @Autowired
    public CustomerDtoMapper(CustomerRepository customerRepository, UserPhotoService userPhotoService) {
        this.customerRepository = customerRepository;
        this.userPhotoService = userPhotoService;
    }

    public CustomerDto mapCustomerToCustomerDto(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(customer.getId());
        customerDto.setUsername(customer.getUsername());
        customerDto.setRoles(customer.getRoles());
        customerDto.setCreatedDate(customer.getCreatedDate());
        customerDto.setCreatedBy(customer.getCreatedBy());
        customerDto.setCompanyName(customer.getCompanyName());
        customerDto.setCompanyStreet(customer.getCompanyStreet());
        customerDto.setCompanyPostalCode(customer.getCompanyPostalCode());
        customerDto.setCompanyCity(customer.getCompanyCity());
        customerDto.setCompanyNip(customer.getCompanyNip());
        customerDto.setCompanyRegon(customer.getCompanyRegon());
        customerDto.setContacts(customer.getContacts());
        customerDto.setPhoto(userPhotoService.getPhoto(customer.getPhoto(), UserPhotoSize.IMAGE_256x256));
        return customerDto;
    }

    public Customer mapCustomerDtoToCustomer(CustomerDto customerDto) {
        Customer customer = customerRepository.findById(customerDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        customer.setUsername(customerDto.getUsername());
        customer.setRoles(customerDto.getRoles());
        customer.setCompanyName(customerDto.getCompanyName());
        customer.setCompanyStreet(customerDto.getCompanyStreet());
        customer.setCompanyPostalCode(customerDto.getCompanyPostalCode());
        customer.setCompanyCity(customerDto.getCompanyCity());
        customer.setCompanyNip(customerDto.getCompanyNip());
        customer.setCompanyRegon(customerDto.getCompanyRegon());
        customer.setContacts(customerDto.getContacts());

        customer.getContacts().stream()
                .forEach(contact -> {
                    contact.setCustomer(customer);
                });

        return customer;
    }

}
