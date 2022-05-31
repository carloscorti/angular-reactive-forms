import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface IValidatorOutput {
  [key: string]: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpFrom!: FormGroup;
  invalidHobbitNames = ['sauron', 'saruman', 'azog'];
  get hobbitsControls(): AbstractControl[] {
    return (this.signUpFrom.get('hobbits') as FormArray).controls;
  }

  ngOnInit(): void {
    this.signUpFrom = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbits: new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.signUpFrom);
  }

  addHobbit() {
    (this.signUpFrom.get('hobbits') as FormArray).push(
      new FormControl(null, [
        Validators.required,
        this.hobbitFobidenNameValidation.bind(this),
      ])
    );
  }

  getHobbitControlIndex(index: number): string {
    return `hobbits.${index}`;
  }

  hobbitFobidenNameValidation(control: FormControl): IValidatorOutput | null {
    if (this.invalidHobbitNames.includes(control.value)) {
      return { isHobbitForbiddedName: true };
    }
    return null;
  }
}
