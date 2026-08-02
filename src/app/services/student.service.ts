import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

// الـ Service ده هو المسؤول عن إدارة بيانات الطلاب (Single Source of Truth)
// بيستخدم BehaviorSubject عشان أي component يشترك فيه، يعرف يتحدث تلقائي
// لما القائمة تتغير (إضافة / حذف)
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // بيانات مبدئية (Mock Data) عشان القائمة متكونش فاضية من الأول
  private students: Student[] = [
    { id: 1, name: 'Ahmed Salah', age: 20, grade: 88, status: 'Passed' },
    { id: 2, name: 'Mona Khaled', age: 19, grade: 45, status: 'Failed' },
    { id: 3, name: 'Youssef Adel', age: 21, grade: 97, status: 'Passed' }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);
  private nextId = 4;

  // getStudents(): بيرجع Observable عشان أي component يشترك ويتحدث لايف
  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  // addStudent(): بتضيف طالب جديد وتحسب الـ status تلقائي من الـ grade
  addStudent(student: Omit<Student, 'id' | 'status'>): void {
    const newStudent: Student = {
      ...student,
      id: this.nextId++,
      status: student.grade >= 50 ? 'Passed' : 'Failed'
    };
    this.students = [...this.students, newStudent];
    this.studentsSubject.next(this.students);
  }

  // deleteStudent(): بتشيل الطالب بالـ id بتاعه
  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.studentsSubject.next(this.students);
  }
}
