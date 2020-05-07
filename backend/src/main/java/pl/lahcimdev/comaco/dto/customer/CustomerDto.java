package pl.lahcimdev.comaco.dto.customer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lahcimdev.comaco.customer.domain.CompanyContact;
import pl.lahcimdev.comaco.user.domain.Role;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class CustomerDto {

    private Long id;
    private String username;
    private List<Role> roles;
    private LocalDateTime createdDate;
    private String createdBy;
    private String companyName;
    private String companyStreet;
    private String companyPostalCode;
    private String companyCity;
    private String companyNip;
    private String companyRegon;
    private List<CompanyContact> contacts;
    private String photo;

}
