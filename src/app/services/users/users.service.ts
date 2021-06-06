import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class UserService {
  constructor() {}

  public async getUsers(index: number): Promise<any> {
    return fetch('https://reqres.in/api/users?page=' + index, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      const userResponse = response.json();
      return userResponse;
    });
  }

  public async getUserDetailsById(id: number): Promise<any> {
    return fetch('https://reqres.in/api/users/' + id, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      const userResponse = response.json();
      return userResponse;
    });
  }

  public async updateUserDetailsById(id: number, body: any): Promise<any> {
    return fetch('https://reqres.in/api/users/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      const userResponse = response.json();
      return userResponse;
    });
  }
}