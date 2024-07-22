import { inject, Injectable } from '@angular/core';
import { IUser } from './app.service';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  loggedIn = false;

  constructor(private route: Router, private storage: StorageMap) {
    this.storage.has('user').subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
  login(user: IUser) {
    this.loggedIn = true;
    this.storage.set('user', JSON.stringify(user)).subscribe(() => {
      console.log('保存成功');
    });
  }
  logout() {
    this.loggedIn = false;
    this.storage.delete('user').subscribe(() => {
      this.route.navigate(['login']);
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser(): Observable<any> {
    return this.storage.get('user');
  }
}
