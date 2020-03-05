package pl.lahcimdev.comaco.dto.basicemployee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.service.UserPhotoSize;

@Component
public class BasicEmployeeDtoMapper {

    private UserPhotoService userPhotoService;

    @Autowired
    public BasicEmployeeDtoMapper(UserPhotoService userPhotoService) {
        this.userPhotoService = userPhotoService;
    }

    public BasicEmployeeDto mapEmployeeToBaseEmployeeDto(Employee employee) {
        BasicEmployeeDto basicEmployeeDto = new BasicEmployeeDto();

        basicEmployeeDto.setId(employee.getId());
        basicEmployeeDto.setFirstName(employee.getFirstName());
        basicEmployeeDto.setLastName(employee.getLastName());
        basicEmployeeDto.setEmployeeType(employee.getEmployeeType());
        basicEmployeeDto.setPhoto(userPhotoService.getPhoto(employee.getPhoto(), UserPhotoSize.IMAGE_32x32));
        return basicEmployeeDto;
    }


}
