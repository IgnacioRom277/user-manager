import { Injectable } from "@angular/core";

import { AuthBody } from '../../interfaces/index';

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor() {}

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
      return authResponse;
    });
  }
}