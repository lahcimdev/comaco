import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { GetBasicEmployeeDtoPageAction } from 'src/app/state/employee/employee.actions';
import { PageBasicEmployeeDto } from 'src/api/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { expandableRowAnimation } from './expandable-row.animation';
import { Navigate } from '@ngxs/router-plugin';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styles: ['./list-employee.component.css'],
  animations: [expandableRowAnimation]
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: false })
  private matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private matSort: MatSort;
  @ViewChild(MatInput, { static: false })
  private filter: MatInput;

  private displayedColumns: string[] = ['id', 'photo', 'firstName', 'lastName', 'employeeType', 'button'];
  private expandedSymbol: string = '';

  private filterText = new Subject<void>();
  private filterSubscription: Subscription;

  constructor(private store: Store) { }

  @Select(state => state.employee.basicEmployeeDtoPage)
  basicEmployeeDtoPage$: Observable<PageBasicEmployeeDto>;

  ngOnInit() {
    this.store.dispatch(new GetBasicEmployeeDtoPageAction(0, 10));
    this.filterSubscription = this.filterText.pipe(debounceTime(400)).subscribe(filterText => {
      this.refreshList();
    })
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
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

  editEmployee(id: number) {
    this.store.dispatch(new Navigate(['/edit-employee', id]));
  }

  deleteEmployee(id: number) {

  }


}
