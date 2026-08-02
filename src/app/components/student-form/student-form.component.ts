import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy {
  @Output() studentAdded = new EventEmitter<Omit<Student, 'id' | 'status'>>();

  private valueChangesSub?: Subscription;

  studentForm = this.fb.group({
    name: ['', [Validators.required]],
    age: [null as number | null, [Validators.required, Validators.min(18)]],
    grade: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.valueChangesSub = this.studentForm.valueChanges.subscribe(() => {
    });
  }

  onAddStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const { name, age, grade } = this.studentForm.value;

    this.studentAdded.emit({
      name: name as string,
      age: age as number,
      grade: grade as number
    });

    this.studentForm.reset();
  }

  get name() { return this.studentForm.get('name'); }
  get age() { return this.studentForm.get('age'); }
  get grade() { return this.studentForm.get('grade'); }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }
}
