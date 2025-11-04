import React from 'react';
import type { Course } from '../types';
import Button from './Button';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelectCourse }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-slate-200/60 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
      <div className="aspect-video overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <course.icon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{course.title}</h3>
        </div>
        <p className="mt-4 text-slate-600 leading-relaxed">{course.description}</p>
      </div>
      <div className="mt-auto bg-slate-50/70 p-6 flex justify-between items-center">
        <p className="text-2xl font-bold text-indigo-600">{course.price} د.ج</p>
        <Button onClick={() => onSelectCourse(course)}>
          عرض التفاصيل
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;