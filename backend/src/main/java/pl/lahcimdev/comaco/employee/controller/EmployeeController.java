package pl.lahcimdev.comaco.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import pl.lahcimdev.comaco.dto.basicemployee.BasicEmployeeDto;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.employee.service.EmployeeService;

@RestController
@RequestMapping("api/employee")
public class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //nieużywane
    @PostMapping("/new")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    //nieuzywane
    @GetMapping()
    public Employee getAuthenticatedEmployee() {
        return employeeService.getAuthenticatedEmployee();
    }

    @GetMapping("/list")
    public Page<BasicEmployeeDto> getBasicEmployeeDtoPage(@RequestParam int page, @RequestParam int size) {
        return employeeService.getBasicEmployeeDtoPage(PageRequest.of(page, size, Sort.Direction.ASC, "lastName", "firstName"));
    }

}
