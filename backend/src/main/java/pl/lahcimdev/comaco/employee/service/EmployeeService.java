package pl.lahcimdev.comaco.employee.service;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lahcimdev.comaco.dto.basicemployee.BasicEmployeeDto;
import pl.lahcimdev.comaco.dto.basicemployee.BasicEmployeeDtoMapper;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.employee.repository.EmployeeRepository;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.user.domain.UserType;

import javax.persistence.EntityNotFoundException;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;
    private PasswordEncoder passwordEncoder;
    private BasicEmployeeDtoMapper basicEmployeeDtoMapper;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder, BasicEmployeeDtoMapper basicEmployeeDtoMapper) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.basicEmployeeDtoMapper = basicEmployeeDtoMapper;
    }

    @Transactional
    public Employee createEmployee(Employee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setUserType(UserType.EMPLOYEE);
        Employee employeeTemp = employeeRepository.save(employee);
        employeeTemp.getAddress().stream().forEach(address -> {
            address.setEmployee(employeeTemp);
        });
        return employeeTemp;
    }

    public void updateEmployeePhoto(Long id, String employeePhoto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        String employeePhotoPath = UserPhotoService.savePhoto(UserType.EMPLOYEE, employee.getUsername(), employeePhoto);
        employee.setPhoto(employeePhotoPath);
        employeeRepository.save(employee);
    }

    public Page<BasicEmployeeDto> getBasicEmployeeDtoPage(Pageable pageable, String filter) {
        return employeeRepository.findAllByLastNameContainingOrFirstNameContaining(pageable, filter, filter).map(employee ->
                basicEmployeeDtoMapper.mapEmployeeToBaseEmployeeDto(employee)
        );
    }

}
