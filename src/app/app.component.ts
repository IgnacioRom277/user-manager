import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { LocalStorageService } from './services/utils/local-storage.service';
import { AuthService } from '../app/services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isExpanded = true;
  public isUserLoggedIn: boolean = false;
  public subscription!: Subscription;
  public title: string = 'user-manager';

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.getLoggedIn().subscribe(value => {
      this.isUserLoggedIn = value;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * @description Remove token at local storage
   */
  public onLogout(): void {
    this.localStorage.removeItem('token');
    window.location.reload();
  }

  /**
   * @description Returns to last location
   */
  public onBack(): void {
    this.location.back();
  }

  /**
   * @description Go to home url and reload page
   */
  public onHome(): void {
    this.router.navigate(['/home']);
  }
}
