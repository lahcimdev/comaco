package pl.lahcimdev.comaco.customer.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor

@Entity
public class Customer extends User {

    private String companyName;

    private String companyStreet;

    private String companyPostalCode;

    private String companyCity;

    private String companyNip;

    private String companyRegon;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Size(min = 1)
    private List<CompanyContact> contacts;

    private String photo;

}
