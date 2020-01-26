package pl.lahcimdev.comaco.dto.basicemployee;

import pl.lahcimdev.comaco.employee.domain.EmployeeType;

public class BasicEmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private EmployeeType employeeType;

    public BasicEmployeeDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public EmployeeType getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(EmployeeType employeeType) {
        this.employeeType = employeeType;
    }

}
