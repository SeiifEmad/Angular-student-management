import { Pipe, PipeTransform } from '@angular/core';

// Pipe مخصص بيحول الدرجة الرقمية لتقييم نصي
// 95+ => Excellent | 80+ => Very Good | 65+ => Good | 50+ => Pass | أقل من 50 => Failed
@Pipe({
  name: 'passStatus',
  standalone: true
})
export class PassStatusPipe implements PipeTransform {
  transform(grade: number): string {
    if (grade >= 95) return 'Excellent';
    if (grade >= 80) return 'Very Good';
    if (grade >= 65) return 'Good';
    if (grade >= 50) return 'Pass';
    return 'Failed';
  }
}
