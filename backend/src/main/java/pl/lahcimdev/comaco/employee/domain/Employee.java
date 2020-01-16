package pl.lahcimdev.comaco.employee.domain;

import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.Entity;

@Entity
public class Employee extends User {

    private String employee;

    private String firstName;

    private String lastName;

//    private String phone;

//    private String email;

//    private String employeeType; enum, czy to sie nie gryzie z rolami

//    private String gender; enum

//    private String pesel;

//    private List<Address> address;

//    private IdCard idCard; typ dokumentu np dowód o numerze i wydany przez

//    private PaymentBill paymentBill (paski wypłat czy FV itd, osobna klasa w której jest ID usera czy jakies powiązanie)


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
}
