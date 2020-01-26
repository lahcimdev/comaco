package pl.lahcimdev.comaco.dto.basicemployee;

import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.employee.domain.Employee;

@Component
public class BasicEmployeeDtoMapper {

    public BasicEmployeeDto mapEmployeeToBaseEmployeeDto(Employee employee) {
        BasicEmployeeDto basicEmployeeDto = new BasicEmployeeDto();

        basicEmployeeDto.setId(employee.getId());
        basicEmployeeDto.setFirstName(employee.getFirstName());
        basicEmployeeDto.setLastName(employee.getLastName());
        basicEmployeeDto.setEmployeeType(employee.getEmployeeType());
        return basicEmployeeDto;
    }


}
