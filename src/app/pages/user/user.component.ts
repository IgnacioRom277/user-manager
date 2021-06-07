import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogStandardComponent } from '../dialog/dialog-standard/dialog-standard.component';
import { PaginatorService } from './../../services/utils/paginator-service';
import { PostsService } from './../../services/posts/posts.service';
import { User, Post } from './../../interfaces/index';
import { UserService } from './../../services/users/users.service';

import { ToastrService } from 'ngx-toastr';

const DISPLAYED_COLUMNS = ['title', 'body', 'actions'];
const KEY_ID = 'id';

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

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private paginatorService: PaginatorService,
    private postsService: PostsService,
    private readonly builder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

   ngOnInit(): void {
     this.userData = {
       id: 0,
       email: '',
       first_name: '',
       last_name: '',
       avatar: ''
     };
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params[KEY_ID];
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
    if (this.userForm.controls.email.hasError('required')) {
      return 'El correo electrónico es requerido';
    }

    return this.userForm.controls.email.hasError('email') ? 'Ingresa un correo válido' : '';
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
      this.toastr.success('Guardado correctamente: ' + updateStatus.first_name + ' ' + updateStatus.last_name + ' - ' + updateStatus.email)
    } else {
      this.toastr.error('Hubo un error al guardar el usuario');
    }
  }

  /**
   * @description Delete a post by identifier
   * @param postData Post data to be deleted
   */
  public async onDelete(postData: Post): Promise<void> {
    const dialogRef = this.dialog.open(DialogStandardComponent, {
      data: {
        title: "Eliminación de Post",
        resume: "Estas por eliminar el post, esta acción no es reversible",
        imgRef: "../../../assets/img/delete.png",
        question: "¿Deseas eliminar el post?",
        button1: "Cancelar",
        button2: "Confirmar"
      },
      width: '620px'
    })

    dialogRef.afterClosed().subscribe(async(result: any) => {
      if (result === 'Confirm') {
        const deleteStatus =  await this.postsService.deletePostByPostId(postData.id);
        if (deleteStatus) {
          this.toastr.success('Eliminado correctamente');
        }
      }
    })
  }


}
