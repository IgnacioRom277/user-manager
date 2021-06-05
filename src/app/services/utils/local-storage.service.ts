import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  /**
   * @description Save an item into web browser storage
   * @param {string} id Item identifier
   * @param {any} item Item to be saved
   */
  public saveItem(id: string, item: any): void {
    localStorage.setItem(id, item);
  }

  /**
   * @description Get item by id
   * @param {string} id Item identifier
   * @returns {any} Item found
   */
  public getItem(id: string): any {
    return localStorage.getItem(id);
  }

  /**
   * @description Deletes an item by id
   * @param {string} id Item identifier
   */
  public removeItem(id: string): void {
    localStorage.removeItem(id);
  }
}
