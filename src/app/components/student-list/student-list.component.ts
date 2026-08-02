import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { StudentCardComponent } from '../student-card/student-card.component';

// StudentListComponent: مسؤول عن عرض كل الطلاب + البحث + الترتيب + الإحصائيات
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

  // ngOnInit: Lifecycle Hook - بنشترك في الـ Service هنا عشان نجيب الطلاب
  // وأي إضافة/حذف تحصل من أي مكان تاني، الليست هنا تتحدث تلقائي
  ngOnInit(): void {
    this.studentsSub = this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  // Bonus: البحث بالاسم + الترتيب بالدرجة سوا، Computed Property على شكل Getter
  get filteredStudents(): Student[] {
    let result = this.students.filter(s =>
      s.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
    );

    result = [...result].sort((a, b) =>
      this.sortAscending ? a.grade - b.grade : b.grade - a.grade
    );

    return result;
  }

  // Bonus: إجمالي الناجحين والراسبين
  get passedCount(): number {
    return this.students.filter(s => s.status === 'Passed').length;
  }

  get failedCount(): number {
    return this.students.filter(s => s.status === 'Failed').length;
  }

  // Event Binding: زرار تبديل اتجاه الترتيب
  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
  }

  // Bonus: Hide/Show القائمة كلها
  toggleListVisibility(): void {
    this.isListVisible = !this.isListVisible;
  }

  // بيستقبل حدث الحذف القادم من StudentCardComponent عن طريق @Output
  onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
  }

  // ngOnDestroy: Lifecycle Hook - بنعمل unsubscribe عشان نمنع Memory Leaks
  ngOnDestroy(): void {
    this.studentsSub?.unsubscribe();
  }
}
