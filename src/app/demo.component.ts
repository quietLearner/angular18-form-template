import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-demo',
  template: `<h1>Hello</h1>`,
})
export class DemoComponent implements OnInit {
  // Angular creates your component
  //  Injection context available
  // Field initializers and constructor execute
  // Angular provides the injection context temporarily while constructing the component. It is not automatically active in lifecycle methods.

  // ✅ Works
  private userService = inject(UserService);

  constructor() {
    // ✅ Works
    const service = inject(UserService);
  }

  ngOnInit() {
    // Angular finishes constructing the component
    // Automatic injection context ends

    // ❌ Does NOT work
    const service = inject(UserService);
  }
}
