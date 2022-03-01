import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getKey( key : any): any {
    const data: any = localStorage.getItem(key)
    return JSON.parse(data);
  }

  setKey( key: any, payload: any ) {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  clearAllStorage() {
    localStorage.clear()
  }

  removeItem(key: any): void{
    localStorage.removeItem(key)
  }

  // private getItem(key: string): string {
  //   return localStorage.getItem(key)
  // }
 
}
