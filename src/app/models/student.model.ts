// موديل الطالب (Student Model)
// بيوصف شكل البيانات بتاعة كل طالب في النظام
export interface Student {
  id: number;
  name: string;
  age: number;
  grade: number;
  status: 'Passed' | 'Failed'; // بيتحسب تلقائي من الـ grade
}
