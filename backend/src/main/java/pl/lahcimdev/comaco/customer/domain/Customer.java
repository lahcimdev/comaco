package pl.lahcimdev.comaco.customer.domain;

import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
public class Customer extends User {

    private String email;

//    private CompanyInfo companyInfo;

//    private Contact contacts;

//    private LocalDateTime createdDate;

//    private Long createdBy;

}
