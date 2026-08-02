import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Student } from '../../models/student.model';
import { PassStatusPipe } from '../../pipes/pass-status.pipe';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && !changes['student'].firstChange) {
      console.log(`Student "${this.student.name}" data changed:`, changes['student'].currentValue);
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  onDelete(): void {
    this.delete.emit(this.student.id);
  }
}
