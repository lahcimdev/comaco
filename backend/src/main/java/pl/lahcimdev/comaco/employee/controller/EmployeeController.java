package pl.lahcimdev.comaco.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lahcimdev.comaco.dto.basicemployee.BasicEmployeeDto;
import pl.lahcimdev.comaco.dto.employee.EmployeeDto;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.employee.domain.EmployeeType;
import pl.lahcimdev.comaco.employee.service.EmployeeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/employee")
public class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/new")
    public Employee createEmployee(@RequestBody @Valid Employee employee) {
        return employeeService.createEmployee(employee);
    }

    @PutMapping("/{id}/photo")
    public void updateEmployeePhoto(@PathVariable Long id, @RequestBody String employeePhoto) {
        employeeService.updateEmployeePhoto(id, employeePhoto);
    }

    @PutMapping("/update")
    public Employee updateEmployee(@RequestBody EmployeeDto employeeDto) {
        return employeeService.updateEmployeeDto(employeeDto);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public EmployeeDto getEmployeeDto(@PathVariable Long id) {
        return employeeService.getEmployeeDto(id);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list")
    public List<BasicEmployeeDto> getBasicEmployeeDtoList() {
        return employeeService.getBasicEmployeeDtoList();
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/page")
    public Page<BasicEmployeeDto> getBasicEmployeeDtoPage(@RequestParam int page, @RequestParam int size,
                                                          @RequestParam(defaultValue = "ASC", required = false) Sort.Direction sort,
                                                          @RequestParam(defaultValue = "id", required = false) String[] properties,
                                                          @RequestParam(defaultValue = "", required = false) String filter) {
        return employeeService.getBasicEmployeeDtoPage(PageRequest.of(page, size, sort, properties), filter);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/types")
    public EmployeeType[] getAllEmployeeTypes() {
        return EmployeeType.values();
    }


}
