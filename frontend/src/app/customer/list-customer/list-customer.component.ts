import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { PageBasicCustomerDto } from 'src/api/models';
import { GetBasicCustomerDtoPageAction, SetBasicCustomerDtoPageAction, DeleteCustomerAndUpdateBasicCustomerDtoPageAction } from 'src/app/state/customer/customer.actions';
import { expandableRowAnimation } from './expandable-row.animation';
import { MatPaginator, MatSort, MatInput } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
  animations: [expandableRowAnimation]
})
export class ListCustomerComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  private matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private matSort: MatSort;
  @ViewChild(MatInput, { static: false })
  private filter: MatInput;

  private displayedColumns: string[] = ['id', 'photo', 'companyName', 'companyNip', 'button'];
  private expandedSymbol: string = '';

  private filterText = new Subject<void>();
  private filterSubscription: Subscription;

  constructor(private store: Store) { }

  @Select(state => state.customer.basicCustomerDtoPage)
  basicCustomerDtoPage$: Observable<PageBasicCustomerDto>;

  ngOnInit() {
    this.store.dispatch(new GetBasicCustomerDtoPageAction(0, 10));
    this.filterSubscription = this.filterText.pipe(debounceTime(400)).subscribe(filterText => {
      this.refreshList();
    })
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
    this.store.dispatch(new SetBasicCustomerDtoPageAction(null));
  }

  refreshList() {
    this.store.dispatch(new GetBasicCustomerDtoPageAction(this.matPaginator.pageIndex, this.matPaginator.pageSize, this.matSort.direction == 'desc' ? 'DESC' : 'ASC', Array.of(this.matSort.active), this.filter.value));
  }

  toggleExpandableSymbol(id: any): void {
    if (this.expandedSymbol === id) {
      this.expandedSymbol = ''
    } else {
      this.expandedSymbol = id;
    }
  }

  editCustomer(id: number) {
    this.store.dispatch(new Navigate(['/edit-customer', id]));
  }

  deleteCustomer(id: number) {
    this.store.dispatch(new DeleteCustomerAndUpdateBasicCustomerDtoPageAction(id, this.matPaginator.pageIndex, this.matPaginator.pageSize, this.matSort.direction == 'desc' ? 'DESC' : 'ASC', Array.of(this.matSort.active), this.filter.value))
  }

}
