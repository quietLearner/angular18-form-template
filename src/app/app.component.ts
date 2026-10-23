import { Component, inject } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent],
})
export class AppComponent {
  // "Which injector should I use to find or create this service?"

  // It needs to know:
  // "Which injector should I use to find or create this service?"
  // When Angular has that information available to the currently executing code, we say the code is running inside an injection context.
  // Think of an injection context as Angular temporarily saying:
  // "I'm creating this component. If you need any dependencies, ask me now. I know which injector to use."

  private userService = inject(UserService);

  constructor() {
    console.log(this.userService.getUser());
  }
}
