package pl.lahcimdev.comaco.employee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.lahcimdev.comaco.dto.basicemployee.BasicEmployeeDto;
import pl.lahcimdev.comaco.dto.basicemployee.BasicEmployeeDtoMapper;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.employee.repository.EmployeeRepository;

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

    public Employee createEmployee(Employee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    public Employee getAuthenticatedEmployee() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return employeeRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("Not found Employee with username: " + username)
        );
    }

    public Page<BasicEmployeeDto> getBasicEmployeeDtoPage(Pageable pageable) {
        return employeeRepository.findAll(pageable).map(employee ->
            basicEmployeeDtoMapper.mapEmployeeToBaseEmployeeDto(employee)
        );
    }

}
