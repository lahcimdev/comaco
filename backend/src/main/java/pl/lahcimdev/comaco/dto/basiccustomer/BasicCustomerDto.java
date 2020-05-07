package pl.lahcimdev.comaco.dto.basiccustomer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class BasicCustomerDto {


    private Long id;
    private String companyName;
    private String companyNip;
    private String photo;

}
