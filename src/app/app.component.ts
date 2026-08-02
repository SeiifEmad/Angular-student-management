import { Component } from '@angular/core';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';

// AppComponent: هو الأب (Parent) اللي بيوصل بين الفورم والليست
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentFormComponent, StudentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student Management System';

  constructor(private studentService: StudentService) {}

  // بيستقبل الطالب الجديد القادم من StudentFormComponent عن طريق @Output
  // وبعدين بينده على الـ Service عشان يضيفه فعليًا
  onStudentAdded(newStudent: Omit<Student, 'id' | 'status'>): void {
    this.studentService.addStudent(newStudent);
  }
}
