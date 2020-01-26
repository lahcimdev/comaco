package pl.lahcimdev.comaco.employee.domain;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@EntityListeners({AuditingEntityListener.class})
//@Table(indexes = @Index(columnList = "lastName", name = "LASTNAME_INDEX"))
public class Employee extends User {

    private String employee;

    @Enumerated(EnumType.STRING)
    private EmployeeType employeeType;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String email;

    private String phone;

    @ManyToOne
    private Address address;

    @CreatedDate
    private LocalDateTime createdDate;

    @CreatedBy
    private Long createdBy;


//    private String gender; enum

//    private String pesel;

//    private IdCard idCard; typ dokumentu np dowód o numerze i wydany przez

//    private PaymentBill paymentBill (paski wypłat czy FV itd, osobna klasa w której jest ID usera czy jakies powiązanie)


    public Employee() {
    }

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public EmployeeType getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(EmployeeType employeeType) {
        this.employeeType = employeeType;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }


}
