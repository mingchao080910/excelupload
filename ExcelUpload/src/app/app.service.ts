import { Injectable } from '@angular/core';

export interface IUser {
  userName?: string|undefined;
  remember?: boolean;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  userInfo!: IUser;
  constructor() {}
  getUser() {
    return this.userInfo;
  }
  setUser(value: IUser) {
    this.userInfo = value;
  }
}
