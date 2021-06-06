import { Injectable } from "@angular/core";

import { AuthBody } from '../../interfaces/index';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  /**
   * @description Execute a request to get access token
   * @param {AuthBody} body Body to send to login request
   * @returns {Promise<any>} A promise with authenticaction response
   */
  public async login(body: AuthBody): Promise<any> {
    return fetch('https://reqres.in/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: body.email,
        password: body.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      const authResponse = response.json();
      this.setLocalStorageData(authResponse);
      return authResponse;
    });
  }

  /**
   * @description Set token to local storage if it exists
   * @param {Promise<any>} authResponse Promise reponse form login request
   */
  public async setLocalStorageData(authResponse: Promise<any>): Promise<void> {
    const response =  await authResponse;
    if (response.token) {
      this.localStorageService.saveItem('token', response.token);
    }
  }

  /**
   * @description Check if user is authenticated
   * @returns {boolean} True if token exists at local storage, false if no token
   */
  public isAuthenticated(): boolean {
    const token = this.localStorageService.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}