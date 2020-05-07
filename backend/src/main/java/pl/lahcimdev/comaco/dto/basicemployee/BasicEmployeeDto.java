package pl.lahcimdev.comaco.dto.basicemployee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lahcimdev.comaco.employee.domain.EmployeeType;

@Getter
@Setter
@NoArgsConstructor

public class BasicEmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private EmployeeType employeeType;
    private String photo;

}
