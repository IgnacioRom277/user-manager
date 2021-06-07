import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogStandardComponent } from '../dialog/dialog-standard/dialog-standard.component';
import { DISPLAYED_COLUMNS, UserConsts, UserTags } from './constants/user.constants';
import { PaginatorService } from './../../services/utils/paginator-service';
import { PostsService } from './../../services/posts/posts.service';
import { User, Post } from './../../interfaces/index';
import { UserService } from './../../services/users/users.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../app.component.css']
})
export class UserComponent implements OnInit {
  public dataSource!: MatTableDataSource<Post>;
  public displayedColumns: Array<string> = DISPLAYED_COLUMNS;
  public isValidData!: boolean;
  public userData!: User;
  public userForm!: FormGroup;
  public userId!: number;
  public tags!: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private paginatorService: PaginatorService,
    private postsService: PostsService,
    private readonly builder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    this.tags = UserTags;
  }

   ngOnInit(): void {
     this.userData = {
       id: 0,
       email: UserConsts.EMPTY_STRING,
       first_name: UserConsts.EMPTY_STRING,
       last_name: UserConsts.EMPTY_STRING,
       avatar: UserConsts.EMPTY_STRING
     };
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params[UserConsts.KEY_ID];
    })
    this.getUserDetails()
    this.getUserPosts();
    this.initForm(this.builder)
    this.paginatorService.paginatorLabels(this.paginator);
  }


  /**
   * @description Get the user's details by user selected
   */
  private async getUserDetails(): Promise<void> {
    const userDetails = await this.userService.getUserDetailsById(this.userId);
    this.userData = userDetails.data;
    this.initForm(this.builder)
  }

  /**
   * @description Get the user's post by user id
   */
  private async getUserPosts(): Promise<void> {
    const userPosts = await this.postsService.getPostByUserId(this.userId);
    if (userPosts) {
      this.dataSource = new MatTableDataSource(userPosts);
      this.dataSource.paginator = this.paginator;
      if (userPosts.length) {
        this.isValidData = true;
      } else {
        this.isValidData = false;
      }
    } else {
      this.isValidData = false;
    }
  }

  /**
   * @description Initialize the user form
   * @param formBuilder Formbuilder to create abstractControl
   */
  private initForm(formBuilder: FormBuilder): void {
    this.userForm = formBuilder.group({
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      firstName: new FormControl(this.userData.first_name, [Validators.required]),
      lastName: new FormControl(this.userData.last_name, [Validators.required])
    });
  }

  /**
   * @description Determinate email error message
   * @returns {string} Error message to be display inline
   */
  public getErrorMessage(): string {
    if (this.userForm.controls.email.hasError(UserConsts.KEY_REQUIRED)) {
      return UserConsts.ERROR_EMAIL_REQUIRED;
    }

    return this.userForm.controls.email.hasError(UserConsts.KEY_EMAIL) ? UserConsts.ERROR_EMAIL_INVALID : UserConsts.EMPTY_STRING;
  }

  /**
   * @description Udpate the user info
   */
  public async onSave(): Promise<void> {
    const body = {
      email: this.userForm.value.email,
      first_name: this.userForm.value.firstName,
      last_name: this.userForm.value.lastName
    }
    const updateStatus = await this.userService.updateUserDetailsById(this.userId, body);
    if (updateStatus) {
      this.toastr.success( `${UserConsts.MESSAGE_SUCCESS_SAVE} ${updateStatus.first_name} ${updateStatus.last_name} - ${updateStatus.email}`)
    } else {
      this.toastr.error(UserConsts.ERROR_UPDATE_USER);
    }
  }

  /**
   * @description Delete a post by identifier
   * @param postData Post data to be deleted
   */
  public async onDelete(postData: Post): Promise<void> {
    const dialogRef = this.dialog.open(DialogStandardComponent, {
      data: {
        title: UserConsts.DIALOG_TITLE,
        resume: UserConsts.DIALOG_RESUME,
        imgRef: UserConsts.DIALOG_IMG_REF,
        question: UserConsts.DIALOG_QUESTION,
        button1: UserConsts.DIALOG_BUTTON_1,
        button2: UserConsts.DIALOG_BUTTON_2
      },
      width: UserConsts.DIALOG_WIDTH
    })

    dialogRef.afterClosed().subscribe(async(result: any) => {
      if (result === UserConsts.CONFIRM) {
        const deleteStatus =  await this.postsService.deletePostByPostId(postData.id);
        if (deleteStatus) {
          this.toastr.success(UserConsts.MESSAGE_SUCCESS_DELETE);
        }
      }
    })
  }


}
