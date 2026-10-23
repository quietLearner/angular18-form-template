import { JsonPipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  // This creates a signal-based view query referencing your NgForm directive. <form #form="ngForm">
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    // Angular waits until rendering is finished before executing the callback.afterNextRender run once
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');

      if (savedForm) {
        const loadedForm = JSON.parse(savedForm);
        const savedEmail = loadedForm.email;
        setTimeout(() => this.form().controls['email'].setValue(savedEmail), 2);
      }

      this.form()
        .valueChanges?.pipe(
          debounceTime(500),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (val) => {
            console.log(val.email);
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({
                email: val.email,
              }),
            );
          },
        });
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }

    // console.log(form.value);
    const email = form.value['email'];
    const password = form.form.value['password'];
    console.log(email, password);
    console.log(form.valid);

    form.reset();
  }
}
