package pl.lahcimdev.comaco.dto.basiccustomer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.service.UserPhotoSize;

@Component
public class BasicCustomerDtoMapper {

    private UserPhotoService userPhotoService;

    @Autowired
    public BasicCustomerDtoMapper(UserPhotoService userPhotoService) {
        this.userPhotoService = userPhotoService;
    }

    public BasicCustomerDto mapCustomerToBasicCustomerDto(Customer customer) {
        BasicCustomerDto basicCustomerDto = new BasicCustomerDto();

        basicCustomerDto.setId(customer.getId());
        basicCustomerDto.setCompanyName(customer.getCompanyName());
        basicCustomerDto.setCompanyNip(customer.getCompanyNip());
        basicCustomerDto.setPhoto(userPhotoService.getPhoto(customer.getPhoto(), UserPhotoSize.IMAGE_32x32));
        return basicCustomerDto;
    }

}
