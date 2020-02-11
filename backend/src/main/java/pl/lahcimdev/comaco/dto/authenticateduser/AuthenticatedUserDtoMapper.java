package pl.lahcimdev.comaco.dto.authenticateduser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.customer.repository.CustomerRepository;
import pl.lahcimdev.comaco.employee.repository.EmployeeRepository;
import pl.lahcimdev.comaco.service.UserPhotoService;

import javax.persistence.EntityNotFoundException;

@Component
public class AuthenticatedUserDtoMapper {

    private EmployeeRepository employeeRepository;
    private CustomerRepository customerRepository;

    @Autowired
    public AuthenticatedUserDtoMapper(EmployeeRepository employeeRepository, CustomerRepository customerRepository) {
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
    }

    public AuthenticatedUserDto mapEmployeeToAuthenticatedUserDto(String username) {
        AuthenticatedUserDto authenticatedUserDto = new AuthenticatedUserDto();
        return employeeRepository.findByUsername(username).map(
                employee -> {
                    authenticatedUserDto.setUsername(employee.getUsername());
                    authenticatedUserDto.setUserType(employee.getUserType());
                    authenticatedUserDto.setRoles(employee.getRoles());
                    authenticatedUserDto.setFirstName(employee.getFirstName());
                    authenticatedUserDto.setLastName(employee.getLastName());
                    authenticatedUserDto.setPhoto(UserPhotoService.getPhoto(employee.getPhoto()));
                    return authenticatedUserDto;
                }).orElseThrow(
                () -> new EntityNotFoundException("User doesn't exist in database")
        );
    }

    public AuthenticatedUserDto mapCustomerToAuthenticatedUserDto(String username) {
        AuthenticatedUserDto authenticatedUserDto = new AuthenticatedUserDto();
        return customerRepository.findByUsername(username).map(
                customer -> {
                    authenticatedUserDto.setUsername(customer.getUsername());
                    authenticatedUserDto.setUserType(customer.getUserType());
                    authenticatedUserDto.setRoles(customer.getRoles());
                    return authenticatedUserDto;
                }).orElseThrow(
                () -> new EntityNotFoundException("User doesn't exist in database")
        );
    }

}
