package pl.lahcimdev.comaco.employee.domain;

import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.Entity;

@Entity
public class Employee extends User {

    private String employee;

}
