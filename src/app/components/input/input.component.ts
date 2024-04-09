import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  showError(control: FormControl) {
    return {
      'is-invalid': this.isFieldValid(control),
      '': this.isFieldValid(control)
    };

  }
  isFieldValid(control: FormControl) {
    return !control.valid && control.touched;
  }

  isLabelRequired() {
    if (this.control.hasValidator(Validators.required)) return 'required';

    return '';
  }
}
