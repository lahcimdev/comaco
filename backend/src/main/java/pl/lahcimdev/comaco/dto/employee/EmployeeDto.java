package pl.lahcimdev.comaco.dto.employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lahcimdev.comaco.employee.domain.Address;
import pl.lahcimdev.comaco.employee.domain.EmployeeType;
import pl.lahcimdev.comaco.employee.domain.Sex;
import pl.lahcimdev.comaco.user.domain.Role;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class EmployeeDto {

    private Long id;
    private String username;
    private List<Role> roles;
    private LocalDateTime createdDate;
    private String createdBy;
    private EmployeeType employeeType;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private Sex sex;
    private List<Address> address;
    private String photo;

}
