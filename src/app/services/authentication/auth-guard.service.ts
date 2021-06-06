import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * @description Check for allowed routes if users is authenticated
   * @param route Information about a route
   * @param state State of the router
   * @returns {any} If route is allowed or not
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isUserAuthenticated = this.authService.isAuthenticated()
    if (isUserAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}