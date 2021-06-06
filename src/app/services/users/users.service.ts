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
}