import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { PaginatorService } from './../../services/utils/paginator-service';
import { User, UserReponse } from './../../interfaces/users';
import { UserService } from './../../services/users/users.service';

const DISPLAYED_COLUMNS = ['preview', 'email', 'first_name', 'last_name'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>;
  public displayedColumns: string[] = DISPLAYED_COLUMNS;
  public totalUsers!: number;
  public userList!: Array<User>;
  public userResponse!: UserReponse;
  public usersPerPage!: number;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private paginatorService: PaginatorService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.dataSource = new MatTableDataSource();
    this.paginatorService.paginatorLabels(this.paginator);
  }

  /**
   * @description Get users data according to index set
   * @param {PageEvent} event Optional event when page in paginator change
   */
  public async getUsers(event?: PageEvent): Promise<void> {
    const index = event ? event.pageIndex + 1 : 1;
    this.userResponse = await this.userService.getUsers(index);
    if (this.userResponse && this.userResponse.data.length) {
      this.userList = this.userResponse.data;
      this.dataSource = new MatTableDataSource(this.userResponse.data);
      this.totalUsers = this.userResponse.total;
      this.usersPerPage = this.userResponse.per_page;
    }
  }
}
