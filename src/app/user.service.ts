import { Injectable } from '@angular/core';

// Register UserService with the root injector so it can be injected throughout the application.
@Injectable({
  providedIn: 'root', //'root' refers to the root EnvironmentInjector, which is the application-level injector.
})
export class UserService {
  getUser() {
    return 'John';
  }
}
