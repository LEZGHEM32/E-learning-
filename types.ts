import React from 'react';

export type Page = 'home' | 'course';

export interface User {
  name: string;
  enrolledCourses: CourseId[];
  progress: Record<CourseId, string[]>;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'intro' | 'theory' | 'application';
  videoId: string; 
  pdfUrl: string;
  isFreePreview: boolean;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[]; 
}

export interface Field {
  id: string;
  title: string;
  introLesson: Lesson;
  units: Unit[];
}

export interface Specialization {
  id: string;
  name: string;
  content: Field[];
}

export type CourseId = 'philosophy' | 'arabic';

export interface Course {
  id: CourseId;
  title:string;
  teacher: string;
  price: number;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  imageUrl: string;
  annualProgramPdfUrl: string;
  specializations: Specialization[];
}