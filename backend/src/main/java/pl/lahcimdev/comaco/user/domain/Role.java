package pl.lahcimdev.comaco.user.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor

@Entity
public class Role {

    @Id
    private Long id;
    @NotBlank
    private String name;

}
