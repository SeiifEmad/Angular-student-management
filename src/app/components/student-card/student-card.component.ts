import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Student } from '../../models/student.model';
import { PassStatusPipe } from '../../pipes/pass-status.pipe';

// StudentCardComponent: بيعرض كارت لطالب واحد
// بيوضح Conditional Styling (لون حسب الحالة) و Toggle Details و ngOnChanges
@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule, PassStatusPipe],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent implements OnChanges {
  @Input({ required: true }) student!: Student;
  @Output() delete = new EventEmitter<number>();

  showDetails = false;

  // ngOnChanges: Lifecycle Hook - بيتنفذ كل ما الـ @Input (student) يتغير من بره
  // مفيد هنا لو الدرجة اتعدلت لاحقًا ونحب نتابع التغيير
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && !changes['student'].firstChange) {
      console.log(`Student "${this.student.name}" data changed:`, changes['student'].currentValue);
    }
  }

  // Event Binding: بيتنادى لما نضغط زرار "Toggle Details"
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  // Event Binding: بيتنادى لما نضغط زرار "Delete"
  onDelete(): void {
    this.delete.emit(this.student.id);
  }
}
