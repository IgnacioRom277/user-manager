import { Router } from '@angular/router';
import { LocalStorageService } from './services/utils/local-storage.service';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-manager';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isExpanded = true;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  onLogout() {
    this.localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
