import React, { useState, useMemo, useRef } from 'react';
import type { Course, CourseId } from '../types';
import CourseCard from './CourseCard';
import Button from './Button';
import { SettingsIcon, EyeIcon, EyeOffIcon, GripVerticalIcon } from './icons';

interface CoursePreferences {
  order: CourseId[];
  hidden: CourseId[];
}

interface HomePageProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  preferences: CoursePreferences;
  onUpdatePreferences: (newPreferences: CoursePreferences) => void;
}

const HomePage: React.FC<HomePageProps> = ({ courses, onSelectCourse, preferences, onUpdatePreferences }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<CoursePreferences | null>(null);
  const draggedItem = useRef<CourseId | null>(null);
  const dragOverItem = useRef<CourseId | null>(null);

  // Memoize course data for quick lookup
  const coursesById = useMemo(() => {
    const map = new Map<CourseId, Course>();
    courses.forEach(course => map.set(course.id, course));
    return map;
  }, [courses]);

  // Memoize sorted and visible courses for display
  const visibleCourses = useMemo(() => {
    if (!preferences) return courses;
    const visibleIds = new Set(preferences.order.filter(id => !preferences.hidden.includes(id)));
    return preferences.order
        .map(id => coursesById.get(id))
        .filter((c): c is Course => !!c && visibleIds.has(c.id));
  }, [preferences, coursesById]);

  // Handlers for customization mode
  const handleStartCustomizing = () => {
    setDraftPreferences(JSON.parse(JSON.stringify(preferences))); // Deep copy
    setIsCustomizing(true);
  };

  const handleCancelCustomizing = () => {
    setDraftPreferences(null);
    setIsCustomizing(false);
  };

  const handleSaveChanges = () => {
    if (draftPreferences) {
      onUpdatePreferences(draftPreferences);
    }
    setIsCustomizing(false);
    setDraftPreferences(null);
  };
  
  // Handlers for course visibility in customization mode
  const handleToggleVisibility = (courseId: CourseId) => {
    if (!draftPreferences) return;

    const newHidden = draftPreferences.hidden.includes(courseId)
        ? draftPreferences.hidden.filter(id => id !== courseId)
        : [...draftPreferences.hidden, courseId];

    setDraftPreferences({ ...draftPreferences, hidden: newHidden });
  };
  
  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, courseId: CourseId) => {
      draggedItem.current = courseId;
      e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, courseId: CourseId) => {
      e.preventDefault();
      dragOverItem.current = courseId;
  };

  const handleDragEnd = () => {
      if (!draftPreferences || !draggedItem.current || !dragOverItem.current) return;
      
      const draggedId = draggedItem.current;
      const overId = dragOverItem.current;

      if (draggedId !== overId) {
          const newOrder = [...draftPreferences.order];
          const draggedIndex = newOrder.indexOf(draggedId);
          const overIndex = newOrder.indexOf(overId);

          // Remove the dragged item and insert it at the new position
          const [removed] = newOrder.splice(draggedIndex, 1);
          newOrder.splice(overIndex, 0, removed);
          
          setDraftPreferences({ ...draftPreferences, order: newOrder });
      }

      draggedItem.current = null;
      dragOverItem.current = null;
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
  };

  // Content for the customization section
  const renderCustomizationView = () => {
    if (!draftPreferences) return null;

    const visibleDraftCourses = draftPreferences.order
        .map(id => coursesById.get(id))
        .filter((c): c is Course => !!c && !draftPreferences.hidden.includes(c.id));
        
    const hiddenDraftCourses = draftPreferences.order
        .map(id => coursesById.get(id))
        .filter((c): c is Course => !!c && draftPreferences.hidden.includes(c.id));

    return (
        <div className="bg-slate-100 p-8 rounded-lg border-2 border-dashed border-slate-300">
            <h3 className="text-3xl font-bold text-slate-800 mb-2">تخصيص لوحة التحكم</h3>
            <p className="text-slate-600 mb-8">قم بسحب وإفلات المواد لتغيير ترتيبها، أو استخدم الأزرار لإخفائها من الصفحة الرئيسية.</p>

            <h4 className="text-xl font-bold text-slate-700 mb-4">المواد الظاهرة</h4>
            <div className="grid md:grid-cols-2 gap-10 min-h-[10rem]">
                {visibleDraftCourses.map(course => (
                    <div
                        key={course.id}
                        draggable
                        onDragStart={e => handleDragStart(e, course.id)}
                        onDragEnter={e => handleDragEnter(e, course.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        className="cursor-move relative"
                    >
                       <CourseCard course={course} onSelectCourse={() => {}} />
                       <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 p-2 rounded-lg">
                           <button onClick={() => handleToggleVisibility(course.id)} title="إخفاء المادة" className="text-white hover:text-amber-300">
                               <EyeOffIcon className="w-6 h-6" />
                           </button>
                           <GripVerticalIcon className="w-6 h-6 text-white/70" />
                       </div>
                    </div>
                ))}
            </div>
            
            {hiddenDraftCourses.length > 0 && (
                <>
                    <h4 className="text-xl font-bold text-slate-700 mt-12 mb-4">المواد المخفية</h4>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {hiddenDraftCourses.map(course => (
                            <div key={course.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                <span className="font-semibold text-slate-800">{course.title}</span>
                                <button onClick={() => handleToggleVisibility(course.id)} title="إظهار المادة" className="text-slate-500 hover:text-green-500">
                                    <EyeIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
            
            <div className="mt-12 flex justify-center gap-4">
                <Button variant="primary" onClick={handleSaveChanges}>حفظ التغييرات</Button>
                <Button variant="secondary" onClick={handleCancelCustomizing}>إلغاء</Button>
            </div>
        </div>
    );
  };
  
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
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900">
              موادنا الدراسية
            </h2>
            {!isCustomizing && (
              <Button variant="secondary" onClick={handleStartCustomizing}>
                <SettingsIcon className="w-5 h-5"/>
                تخصيص
              </Button>
            )}
          </div>
          
          {isCustomizing ? renderCustomizationView() : (
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {visibleCourses.map(course => (
                <CourseCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
              ))}
              {visibleCourses.length === 0 && (
                <div className="md:col-span-2 text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-xl text-slate-500">
                        لم يتم عرض أي مواد. قم بتعديل التفضيلات لإظهار المواد المخفية.
                    </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;