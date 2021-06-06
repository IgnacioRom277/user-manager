import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class PostsService {
  constructor() {}

  public async getPostByUserId(id: number): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id, {
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

  public async deletePostByPostId(id: number): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'DELETE',
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