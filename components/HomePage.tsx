import React from 'react';
import type { Course } from '../types';
import CourseCard from './CourseCard';
import Button from './Button';

interface HomePageProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

const HomePage: React.FC<HomePageProps> = ({ courses, onSelectCourse }) => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-white py-24 sm:py-32">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f59e0b] to-[#4f46e5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            منصة الخلاصة مع الأستاذ <span className="text-indigo-600">لزغم عبد الحق</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-8">
            طريقك نحو التميز في الفلسفة والأدب العربي لشهادة الباكالوريا. دروس مصورة، ملخصات مركزة، ومنهجية تضمن لك أفضل النتائج.
          </p>
          <Button variant="primary">
            اكتشف المواد
          </Button>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            موادنا الدراسية
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;