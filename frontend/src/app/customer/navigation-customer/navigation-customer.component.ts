import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthenticatedUserDto } from 'src/api/models';

@Component({
  selector: 'app-navigation-customer',
  templateUrl: './navigation-customer.component.html',
  styleUrls: ['./navigation-customer.component.css']
})
export class NavigationCustomerComponent implements OnInit {

  @Select(state => state.user.authenticatedUser)
  authenticatedUser$: Observable<AuthenticatedUserDto>;

  constructor() { }

  ngOnInit() {
  }

}
