package pl.lahcimdev.comaco.customer.domain;

import pl.lahcimdev.comaco.user.domain.User;

import javax.persistence.Entity;

@Entity
public class Customer extends User {

    private String customer;

//    private String email;

//    private String phone;
}
