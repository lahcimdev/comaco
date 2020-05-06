package pl.lahcimdev.comaco.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.customer.repository.CustomerRepository;
import pl.lahcimdev.comaco.dto.basiccustomer.BasicCustomerDto;
import pl.lahcimdev.comaco.dto.basiccustomer.BasicCustomerDtoMapper;
import pl.lahcimdev.comaco.dto.customer.CustomerDto;
import pl.lahcimdev.comaco.dto.customer.CustomerDtoMapper;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.service.UserPhotoSize;
import pl.lahcimdev.comaco.user.domain.UserType;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;
    private PasswordEncoder passwordEncoder;
    private CustomerDtoMapper customerDtoMapper;
    private UserPhotoService userPhotoService;
    private BasicCustomerDtoMapper basicCustomerDtoMapper;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder, CustomerDtoMapper customerDtoMapper, UserPhotoService userPhotoService, BasicCustomerDtoMapper basicCustomerDtoMapper) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.customerDtoMapper = customerDtoMapper;
        this.userPhotoService = userPhotoService;
        this.basicCustomerDtoMapper = basicCustomerDtoMapper;
    }

    @Transactional
    public Customer createCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setUserType(UserType.CUSTOMER);
        Customer customerTemp = customerRepository.save(customer);
        customerTemp.getContacts().stream()
                .forEach(contact -> contact.setCustomer(customerTemp));
        return customerTemp;
    }

    public void updateCustomerPhoto(Long id, String customerPhoto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        if ("DELETE".equals(customerPhoto)) {
            userPhotoService.deleteUserPhoto(UserType.CUSTOMER, customer.getId());
        } else {
            String customerPhotoPath = userPhotoService.savePhoto(UserType.CUSTOMER, customer.getId(), customerPhoto);
            customer.setPhoto(customerPhotoPath);
            customerRepository.save(customer);
        }
    }

    public Page<BasicCustomerDto> getBasicCustomerDtoPage(Pageable pageable, String filter) {
        return customerRepository.findAllByCompanyNameContainingOrCompanyNipContaining(pageable, filter, filter).map(customer ->
                basicCustomerDtoMapper.mapCustomerToBasicCustomerDto(customer)
        );
    }

    public List<BasicCustomerDto> getBasicCustomerDtoList() {
        return customerRepository.findAll().stream()
                .map(customer -> basicCustomerDtoMapper.mapCustomerToBasicCustomerDto(customer))
                .collect(Collectors.toList());
    }

    public CustomerDto getCustomerDto(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        return customerDtoMapper.mapCustomerToCustomerDto(customer);
    }

    public Customer updateCustomer(CustomerDto customerDto) {
        return customerRepository.save(customerDtoMapper.mapCustomerDtoToCustomer(customerDto));
    }
}
