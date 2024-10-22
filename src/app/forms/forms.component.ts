import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RestService } from '../services/rest.service';
import { TranslateModule } from '@ngx-translate/core';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? { pastDate: true } : null;
  };
}

export function characterAndSymbolValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const hasCharacter = /[a-zA-Z]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasCharacter || !hasSymbol) {
      return { characterAndSymbol: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  stadiumForm: FormGroup;
  ageOptions: string[] = ['14+', '16+', '18+', '21+', '25+'];
  planForm: FormGroup;
  minDate = new Date();
  password: 'password' | 'text' = 'password';
  @Input() toggleForm = true;
  @Input() stadiumIndex?: number;

  constructor(private fb: FormBuilder, private service: RestService) {
    this.stadiumForm = this.fb.group({
      numberOfPeople: [null, [Validators.required, Validators.min(1)]],
      hasBall: [false, [Validators.required]],
      message: [''],
      phoneNumber: [null],
      ageGroup: [null, Validators.required],
      password: [
        '',
        [
          Validators.required,
          characterAndSymbolValidator(),
          Validators.minLength(4),
        ],
      ],
    });
    this.planForm = this.fb.group({
      numberOfPeople: [null, [Validators.required, Validators.min(1)]],
      hasBall: [false, [Validators.required]],
      message: [''],
      phoneNumber: [null, [Validators.required]],
      ageGroup: [null, Validators.required],
      eventDate: [null, [Validators.required, futureDateValidator()]],
      eventTime: [null],
      password: ['', [Validators.required, characterAndSymbolValidator(),Validators.minLength(4),]],
    });
  }
  toggleFormMethod(option: boolean) {
    this.toggleForm = option;
  }
  showPassword(value: 'text' | 'password') {
    this.password = value;
    console.log(this.password);
  }

  onSubmit() {
    if (
      this.stadiumForm.valid &&
      this.stadiumIndex !== undefined &&
      this.stadiumIndex > -1
    ) {
      const numberOfPeople = this.stadiumForm
        .get('numberOfPeople')
        ?.getRawValue();
      const hasBall = this.stadiumForm.get('hasBall')?.getRawValue();
      const message = this.stadiumForm.get('message')?.getRawValue();
      const phoneNumber = this.stadiumForm.get('phoneNumber')?.getRawValue();
      const ageGroup = this.stadiumForm.get('ageGroup')?.getRawValue();
      const password = this.stadiumForm.get('password')?.getRawValue();
      console.log(password);
      
      this.service
        .addJoin(
          this.stadiumIndex,
          numberOfPeople,
          hasBall,
          message,
          phoneNumber,
          ageGroup,
          password
        )
        .subscribe(() => {
          this.stadiumForm.reset();
        });
    }
  }
  onPlanSubmit() {
    if (
      this.planForm.valid &&
      this.stadiumIndex !== undefined &&
      this.stadiumIndex > -1
    ) {
      const numberOfPeople = this.planForm.get('numberOfPeople')?.getRawValue();
      const hasBall = this.planForm.get('hasBall')?.getRawValue();
      const message = this.planForm.get('message')?.getRawValue();
      const phoneNumber = this.planForm.get('phoneNumber')?.getRawValue();
      const ageGroup = this.planForm.get('ageGroup')?.getRawValue();
      const eventDate = this.planForm.get('eventDate')?.getRawValue();
      const eventTime = this.planForm.get('eventTime')?.getRawValue();
      const password = this.planForm.get('password')?.getRawValue();
      this.service
        .addPlan(
          this.stadiumIndex,
          numberOfPeople,
          hasBall,
          message,
          phoneNumber,
          ageGroup,
          eventDate,
          eventTime,
          password
        )
        .subscribe(() => {
          this.planForm.reset();
        });
    }
  }
}
