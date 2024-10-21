import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { RestService } from '../services/rest.service';
import { TranslateModule } from '@ngx-translate/core';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare only the date part
    return selectedDate < today ? { 'pastDate': true } : null;
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
  minDate = new Date()
  @Input() toggleForm = true;
  @Input() stadiumIndex?: number;

  constructor(private fb: FormBuilder, private service: RestService) {
    this.stadiumForm = this.fb.group({
      numberOfPeople: [null, [Validators.required, Validators.min(1)]],
      hasBall: [false, [Validators.required]],
      message: [''],
      phoneNumber: [null],
      ageGroup: [null, Validators.required],
    });
    this.planForm = this.fb.group({
      numberOfPeople: [null, [Validators.required, Validators.min(1)]],
      hasBall: [false, [Validators.required]],
      message: [''],
      phoneNumber: [null, [Validators.required]],
      ageGroup: [null, Validators.required],
      eventDate: [null, [Validators.required, futureDateValidator()]],
      eventTime: [null],
    });
  }
  toggleFormMethod(option: boolean) {
    this.toggleForm = option;
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
      this.service
        .addJoin(
          this.stadiumIndex,
          numberOfPeople,
          hasBall,
          message,
          phoneNumber,
          ageGroup
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
      this.service
        .addPlan(
          this.stadiumIndex,
          numberOfPeople,
          hasBall,
          message,
          phoneNumber,
          ageGroup,
          eventDate,
          eventTime
        )
        .subscribe(() => {
          this.planForm.reset();
        });
    }
  }
}
