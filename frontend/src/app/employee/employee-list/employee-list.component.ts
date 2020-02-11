import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetBasicEmployeeDtoPageAction } from 'src/app/state/employee/employee.actions';
import { PageBasicEmployeeDto } from 'src/api/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { expandableRowAnimation } from './expandable-row.animation';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ['./employee-list.component.css'],
  animations: [expandableRowAnimation]
})
export class EmployeeListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  private matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private matSort: MatSort;
  @ViewChild(MatInput, { static: false })
  private filter: MatInput;

  private displayedColumns: string[] = ['id', 'firstName', 'lastName', 'employeeType', 'button'];
  private expandedSymbol: string = '';

  constructor(private store: Store) { }

  @Select(state => state.employee.basicEmployeeDtoPage)
  basicEmployeeDtoPage$: Observable<PageBasicEmployeeDto>;

  ngOnInit() {
    this.store.dispatch(new GetBasicEmployeeDtoPageAction(0, 10));
  }

  refreshList() {
    this.store.dispatch(new GetBasicEmployeeDtoPageAction(this.matPaginator.pageIndex, this.matPaginator.pageSize, this.matSort.direction=='desc'?'DESC':'ASC', Array.of(this.matSort.active), this.filter.value));
  }

  toggleExpandableSymbol(id: any): void {
    if (this.expandedSymbol === id) {
      this.expandedSymbol = ''
    } else {
      this.expandedSymbol = id;
    }
  }


}
