package pl.lahcimdev.comaco.dto.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.employee.repository.EmployeeRepository;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.service.UserPhotoSize;

import javax.persistence.EntityNotFoundException;

@Component
public class EmployeeDtoMapper {

    private EmployeeRepository employeeRepository;
    private UserPhotoService userPhotoService;

    @Autowired
    public EmployeeDtoMapper(EmployeeRepository employeeRepository, UserPhotoService userPhotoService) {
        this.employeeRepository = employeeRepository;
        this.userPhotoService = userPhotoService;
    }

    public EmployeeDto mapEmployeeToEmployeeDto(Employee employee) {
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setId(employee.getId());
        employeeDto.setUsername(employee.getUsername());
        employeeDto.setRoles(employee.getRoles());
        employeeDto.setCreatedDate(employee.getCreatedDate());
        employeeDto.setCreatedBy(employee.getCreatedBy());
        employeeDto.setEmployeeType(employee.getEmployeeType());
        employeeDto.setFirstName(employee.getFirstName());
        employeeDto.setLastName(employee.getLastName());
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setPhone(employee.getPhone());
        employeeDto.setBirthDate(employee.getBirthDate());
        employeeDto.setSex(employee.getSex());
        employeeDto.setAddress(employee.getAddress());
        employeeDto.setPhoto(userPhotoService.getPhoto(employee.getPhoto(), UserPhotoSize.IMAGE_256x256));
        return employeeDto;
    }

    public Employee mapEmployeeDtoToEmployee(EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        employee.setUsername(employeeDto.getUsername());
        employee.setRoles(employeeDto.getRoles());
        employee.setEmployeeType(employeeDto.getEmployeeType());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setPhone(employeeDto.getPhone());
        employee.setBirthDate(employeeDto.getBirthDate());
        employee.setSex(employeeDto.getSex());
        employee.setAddress(employeeDto.getAddress());

        employee.getAddress().stream()
                .forEach(address -> {
                    address.setEmployee(employee);
                });

        return employee;
    }

}
