package pl.lahcimdev.comaco.employee.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor

@Entity
public class Employee extends User {

    @Enumerated(EnumType.STRING)
    private EmployeeType employeeType;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotNull
    @Email
    private String email;
    @NotNull
    private String phone;
    @Past()
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Size(min = 1)
    private List<Address> address;
    private String photo;

}
