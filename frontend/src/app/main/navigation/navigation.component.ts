import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthenticatedUserDto } from 'src/api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  @Select(state => state.user.token)
  token$: Observable<string>;

  @Select(state => state.user.authenticatedUser)
  authenticatedUser$: Observable<AuthenticatedUserDto>;

  ngOnInit() {

  }

}
