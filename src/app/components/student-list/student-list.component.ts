import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentCardComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  searchTerm = '';
  sortAscending = true;
  isListVisible = true;

  private studentsSub?: Subscription;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentsSub = this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  get filteredStudents(): Student[] {
    let result = this.students.filter(s =>
      s.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
    );

    result = [...result].sort((a, b) =>
      this.sortAscending ? a.grade - b.grade : b.grade - a.grade
    );

    return result;
  }

  get passedCount(): number {
    return this.students.filter(s => s.status === 'Passed').length;
  }

  get failedCount(): number {
    return this.students.filter(s => s.status === 'Failed').length;
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
  }

  toggleListVisibility(): void {
    this.isListVisible = !this.isListVisible;
  }

  onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
  }

  ngOnDestroy(): void {
    this.studentsSub?.unsubscribe();
  }
}
