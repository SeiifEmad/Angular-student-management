import { Pipe, PipeTransform } from '@angular/core';


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
