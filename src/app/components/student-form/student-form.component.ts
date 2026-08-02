import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student.model';

// StudentFormComponent: مسؤول بس عن إضافة طالب جديد
// بيستخدم Reactive Forms مع Validation، وبيبعت الطالب الجديد للأب عن طريق @Output
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy {
  // @Output: بيبعت الطالب الجديد اللي اتعمله للـ Parent Component (AppComponent)
  @Output() studentAdded = new EventEmitter<Omit<Student, 'id' | 'status'>>();

  private valueChangesSub?: Subscription;

  studentForm = this.fb.group({
    name: ['', [Validators.required]],
    age: [null as number | null, [Validators.required, Validators.min(18)]],
    grade: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  constructor(private fb: FormBuilder) {}

  // ngOnInit: Lifecycle Hook - بيتنفذ مرة واحدة لما الـ component يتحمل
  ngOnInit(): void {
    // بنعمل subscribe للفورم عشان نتابع أي تغيير (مثال بسيط على استخدام lifecycle)
    this.valueChangesSub = this.studentForm.valueChanges.subscribe(() => {
      // ممكن هنا تعمل أي منطق إضافي زي auto-save أو preview
    });
  }

  // Event Binding: بيتنادى لما نضغط زرار "Add Student"
  onAddStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const { name, age, grade } = this.studentForm.value;

    // بنبعت الداتا للأب عن طريق EventEmitter (@Output)
    this.studentAdded.emit({
      name: name as string,
      age: age as number,
      grade: grade as number
    });

    this.studentForm.reset();
  }

  // Getters بتسهل الوصول للـ Form Controls في الـ Template عشان الـ Validation messages
  get name() { return this.studentForm.get('name'); }
  get age() { return this.studentForm.get('age'); }
  get grade() { return this.studentForm.get('grade'); }

  // ngOnDestroy: Lifecycle Hook - بيتنفذ لما الـ component يتشال من الـ DOM
  // مهم عشان نعمل unsubscribe ونتجنب Memory Leaks
  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }
}
