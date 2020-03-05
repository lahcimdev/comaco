package pl.lahcimdev.comaco.employee.service;

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
import pl.lahcimdev.comaco.service.UserPhotoSize;
import pl.lahcimdev.comaco.user.domain.UserType;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;
    private PasswordEncoder passwordEncoder;
    private BasicEmployeeDtoMapper basicEmployeeDtoMapper;
    private UserPhotoService userPhotoService;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder, BasicEmployeeDtoMapper basicEmployeeDtoMapper, UserPhotoService userPhotoService) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.basicEmployeeDtoMapper = basicEmployeeDtoMapper;
        this.userPhotoService = userPhotoService;
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
        if ("DELETE".equals(employeePhoto)) {
            userPhotoService.deleteUserPhoto(UserType.EMPLOYEE, employee.getId());
        } else {
            String employeePhotoPath = userPhotoService.savePhoto(UserType.EMPLOYEE, employee.getId(), employeePhoto);
            employee.setPhoto(employeePhotoPath);
            employeeRepository.save(employee);
        }
    }

    public Page<BasicEmployeeDto> getBasicEmployeeDtoPage(Pageable pageable, String filter) {
        return employeeRepository.findAllByLastNameContainingOrFirstNameContaining(pageable, filter, filter).map(employee ->
                basicEmployeeDtoMapper.mapEmployeeToBaseEmployeeDto(employee)
        );
    }

    public List<BasicEmployeeDto> getBasicEmployeeDtoList() {
        return employeeRepository.findAll().stream()
                .map(employee -> {
                    return basicEmployeeDtoMapper.mapEmployeeToBaseEmployeeDto(employee);
                }).collect(Collectors.toList());

    }

    public Employee getEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        employee.setPassword(null);
        employee.setPhoto(userPhotoService.getPhoto(employee.getPhoto(), UserPhotoSize.IMAGE_256x256));
        return employee;
    }

    public Employee updateEmployee(Employee employee) {
        Employee employeeDb = employeeRepository.findById(employee.getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist in database"));
        employee.setPassword(employeeDb.getPassword());
        employee.setUserType(employeeDb.getUserType());
        employee.setCreatedDate(employeeDb.getCreatedDate());
        employee.setCreatedBy(employeeDb.getCreatedBy());
        employee.setPhoto(employeeDb.getPhoto());
        return employeeRepository.save(employee);
    }
}
