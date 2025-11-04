import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Course, Lesson, User, CourseId, Field, Specialization } from '../types';
import { LockIcon, PlayIcon, DownloadIcon, BookOpenIcon, PencilIcon, SearchIcon, CheckCircleIcon, KeyIcon } from './icons';
import Button from './Button';
import YouTubePlayer from './YouTubePlayer';

interface CourseDetailPageProps {
  course: Course;
  user: User | null;
  onBack: () => void;
  onLoginClick: () => void;
  onStartEnrollment: (courseId: CourseId) => void;
  onMarkLessonComplete: (courseId: CourseId, lessonId: string) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, user, onBack, onLoginClick, onStartEnrollment, onMarkLessonComplete }) => {
  const [selectedSpecId, setSelectedSpecId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'pdf'>('video');
  const [searchQuery, setSearchQuery] = useState('');
  const mainContentRef = useRef<HTMLDivElement>(null);

  const selectedSpec = course.specializations.find(s => s.id === selectedSpecId);
  const isEnrolled = user?.enrolledCourses.includes(course.id);
  
  const isLessonCompleted = (lessonId: string): boolean => {
    if (!user || !course) return false;
    return user.progress?.[course.id]?.includes(lessonId) ?? false;
  };
  
  const canViewContent = isEnrolled || (selectedLesson?.isFreePreview ?? false);

  const { totalLessons, completedLessons } = useMemo(() => {
    if (!selectedSpec || !user) return { totalLessons: 0, completedLessons: 0 };

    let total = 0;
    selectedSpec.content.forEach(field => {
      total += 1; // Intro lesson
      field.units.forEach(unit => {
        total += unit.lessons.length;
      });
    });

    const completed = user.progress?.[course.id]?.length ?? 0;

    return { totalLessons: total, completedLessons: completed };
  }, [selectedSpec, user, course.id]);

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  const filteredContent = useMemo(() => {
    if (!selectedSpec) return [];
    if (!searchQuery.trim()) {
        return selectedSpec.content;
    }
    const lowercasedQuery = searchQuery.toLowerCase();

    const result: Field[] = [];

    for (const field of selectedSpec.content) {
        const introLessonMatches = field.introLesson.title.toLowerCase().includes(lowercasedQuery) || field.introLesson.description.toLowerCase().includes(lowercasedQuery);

        const filteredUnits = field.units
            .map(unit => ({
                ...unit,
                lessons: unit.lessons.filter(lesson =>
                    lesson.title.toLowerCase().includes(lowercasedQuery) ||
                    lesson.description.toLowerCase().includes(lowercasedQuery)
                ),
            }))
            .filter(unit => unit.lessons.length > 0);

        if (introLessonMatches || filteredUnits.length > 0) {
            result.push({
                ...field,
                units: filteredUnits,
            });
        }
    }
    return result;
  }, [searchQuery, selectedSpec]);


  useEffect(() => {
    if (course.specializations.length === 1) {
      setSelectedSpecId(course.specializations[0].id);
    }
  }, [course.specializations]);

  useEffect(() => {
    if (selectedSpec) {
      const findInitialLesson = (specContent: Field[]): Lesson => {
        for (const field of specContent) {
            if (field.introLesson.isFreePreview) return field.introLesson;
            for (const unit of field.units) {
                const freeLesson = unit.lessons.find(l => l.isFreePreview);
                if (freeLesson) return freeLesson;
            }
        }
        return specContent[0].introLesson;
      };
      setSelectedLesson(findInitialLesson(selectedSpec.content));
    } else {
      setSelectedLesson(null);
    }
  }, [selectedSpec, isEnrolled]);

  useEffect(() => {
    setActiveTab('video');
  }, [selectedLesson]);

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleStartCourseClick = () => {
    if (!isEnrolled) {
      onStartEnrollment(course.id);
    } else {
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getLessonIcon = (type: Lesson['type'], isSelected: boolean, isLocked: boolean) => {
    const iconClass = `w-5 h-5 flex-shrink-0 transition-colors ${
        isSelected ? 'text-white' : isLocked ? 'text-slate-400' : 'text-indigo-500'
    }`;
    switch (type) {
        case 'intro':
            return <PlayIcon className={iconClass} />;
        case 'theory':
            return <BookOpenIcon className={iconClass} />;
        case 'application':
            return <PencilIcon className={iconClass} />;
        default:
            return null;
    }
  };

  const LessonItem: React.FC<{lesson: Lesson, isSelected: boolean, isLocked: boolean}> = ({ lesson, isSelected, isLocked }) => {
    const baseClasses = "p-3 rounded-lg flex justify-between items-start text-right transition-all duration-200 cursor-pointer";
    const stateClasses = isSelected
      ? 'bg-indigo-600 text-white shadow-lg'
      : isLocked
      ? 'opacity-70'
      : 'hover:bg-indigo-100';
    const isCompleted = isLessonCompleted(lesson.id);

    return (
        <li
            onClick={() => handleSelectLesson(lesson)}
            className={`${baseClasses} ${stateClasses}`}
            aria-current={isSelected ? 'page' : undefined}
        >
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 pt-1">
                    {isCompleted ? (
                      <CheckCircleIcon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-green-500'}`} />
                    ) : (
                      getLessonIcon(lesson.type, isSelected, isLocked)
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`font-semibold break-words ${isSelected ? '' : isLocked ? 'text-slate-600' : 'text-slate-800'}`}>{lesson.title}</p>
                    <p className={`text-sm mt-1 leading-tight break-words ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>{lesson.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 pt-1 pl-2">
                {lesson.isFreePreview && !isLocked && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                        مجاني
                    </span>
                )}
                {isLocked && <LockIcon className="w-5 h-5 text-slate-400" />}
            </div>
        </li>
    );
  };

  const TabButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = ({ isActive, onClick, icon, label }) => {
    return (
      <button
        onClick={onClick}
        role="tab"
        aria-selected={isActive}
        className={`flex items-center gap-2 py-3 px-5 font-semibold transition-colors text-base rounded-t-lg border-b-2 ${
          isActive
            ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50'
            : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100'
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  const SpecializationSelector: React.FC<{specializations: Specialization[], onSelect: (id: string) => void}> = ({ specializations, onSelect }) => (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">اختر شعبتك للمتابعة</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        هذه المادة تحتوي على برامج مخصصة لمختلف الشعب. يرجى اختيار شعبتك لعرض الدروس المناسبة لك.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {specializations.map((spec) => (
          <button
            key={spec.id}
            onClick={() => onSelect(spec.id)}
            className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all text-xl font-bold text-slate-700 hover:text-indigo-600 border-2 border-slate-200 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {spec.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <button onClick={onBack} className="text-indigo-600 hover:underline mb-8 inline-flex items-center gap-2">
         &larr; العودة إلى كل المواد
      </button>

      <header className="mb-10 p-8 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start gap-8">
        <img src={course.imageUrl} alt={course.title} className="w-full md:w-48 h-auto rounded-lg object-cover shadow-lg" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-slate-800">{course.title}</h1>
          <p className="text-lg text-slate-600 mt-2 leading-relaxed">{course.longDescription}</p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
               <Button variant="primary" onClick={handleStartCourseClick}>
                  <PlayIcon className="w-5 h-5" />
                  ابدأ المادة
              </Button>
              <a href={course.annualProgramPdfUrl} download="البرنامج السنوي.pdf">
                  <Button variant="secondary">
                      <DownloadIcon className="w-5 h-5" />
                      تحميل البرنامج السنوي العام
                  </Button>
              </a>
          </div>
        </div>
      </header>
      
      <div ref={mainContentRef}>
        {!selectedSpec ? (
          <SpecializationSelector specializations={course.specializations} onSelect={setSelectedSpecId} />
        ) : !selectedLesson ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-xl text-slate-600">...جاري تحميل محتوى الشعبة</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <main className="w-full lg:w-2/3">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                {course.specializations.length > 1 && (
                    <div className="pb-4 mb-6 border-b border-gray-200 flex justify-between items-center">
                      <p className="font-bold text-indigo-700 text-lg">
                          الشعبة: {selectedSpec.name}
                      </p>
                      <button onClick={() => setSelectedSpecId(null)} className="text-sm text-indigo-600 hover:underline">
                          (تغيير الشعبة)
                      </button>
                    </div>
                )}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-3xl font-bold text-slate-800">{selectedLesson.title}</h2>
                  <p className="text-slate-600 mt-2 leading-relaxed">{selectedLesson.description}</p>
                </div>
                
                {canViewContent ? (
                  <div>
                    <div className="flex border-b border-gray-200 mb-4" role="tablist">
                      <TabButton isActive={activeTab === 'video'} onClick={() => setActiveTab('video')} icon={<PlayIcon className="w-5 h-5"/>} label="درس الفيديو" />
                      <TabButton isActive={activeTab === 'pdf'} onClick={() => setActiveTab('pdf')} icon={<BookOpenIcon className="w-5 h-5"/>} label="مطبوعة الدرس" />
                    </div>
                    <div role="tabpanel" hidden={activeTab !== 'video'}>
                      <YouTubePlayer videoId={selectedLesson.videoId} title={selectedLesson.title} />
                    </div>
                    <div role="tabpanel" hidden={activeTab !== 'pdf'}>
                      <div>
                        <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border border-gray-300 shadow-inner">
                           <iframe src={selectedLesson.pdfUrl} title={selectedLesson.title} className="w-full h-full" />
                        </div>
                         <div className="mt-4">
                            <a href={selectedLesson.pdfUrl} download={`${selectedLesson.title}.pdf`}>
                                <Button variant="secondary"><DownloadIcon className="w-5 h-5" /> تحميل مطبوعة الدرس (PDF)</Button>
                            </a>
                        </div>
                      </div>
                    </div>
                     <div className="mt-6 pt-6 border-t border-gray-200">
                      {isLessonCompleted(selectedLesson.id) ? (
                          <Button
                              variant="secondary"
                              disabled
                              className="w-full bg-green-50 text-green-700 border-green-200 cursor-not-allowed"
                          >
                              <CheckCircleIcon className="w-5 h-5" />
                              تم إكمال الدرس
                          </Button>
                      ) : (
                          <Button
                              variant="primary"
                              className="w-full"
                              onClick={() => onMarkLessonComplete(course.id, selectedLesson.id)}
                          >
                              <CheckCircleIcon className="w-5 h-5" />
                              تحديد كـ "مكتمل"
                          </Button>
                      )}
                    </div>
                  </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-lg text-center">
                        <LockIcon className="w-16 h-16 text-indigo-300" />
                        <h3 className="text-2xl font-bold text-indigo-800">هذا الدرس مخصص للمشتركين</h3>
                        <p className="text-indigo-700 max-w-sm">التحق بالمادة الآن للوصول الفوري لهذا الدرس، بالإضافة إلى جميع الدروس، المطبوعات، والتطبيقات الحصرية.</p>
                        <Button onClick={() => onStartEnrollment(course.id)} className="mt-4">
                            <KeyIcon className="w-5 h-5" />
                            التحق الآن مقابل {course.price} د.ج
                        </Button>
                    </div>
                )}
              </div>
            </main>

            <aside className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-4">محتويات المادة</h3>
                 
                 {isEnrolled && (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold text-indigo-700">تقدمك</span>
                            <span className="text-sm font-bold text-indigo-700">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 text-center">
                            {completedLessons} من أصل {totalLessons} درس
                        </p>
                    </div>
                )}
                
                 <div className="relative mb-4">
                      <input
                          type="text"
                          placeholder="ابحث عن درس..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                          aria-label="ابحث عن درس"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <SearchIcon className="w-5 h-5" />
                      </div>
                  </div>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                    {filteredContent.length > 0 ? (
                      filteredContent.map(field => {
                         const lowercasedQuery = searchQuery.toLowerCase().trim();
                         const introLessonMatches = !lowercasedQuery || field.introLesson.title.toLowerCase().includes(lowercasedQuery) || field.introLesson.description.toLowerCase().includes(lowercasedQuery);
                        
                         return (
                            <div key={field.id}>
                                <h4 className="text-lg font-bold text-slate-700 p-3 bg-slate-100 rounded-t-lg sticky top-0">{field.title}</h4>
                                 {introLessonMatches && (
                                  <ul className="space-y-2 p-2 border border-t-0 rounded-b-lg">
                                    <LessonItem lesson={field.introLesson} isSelected={field.introLesson.id === selectedLesson?.id} isLocked={!field.introLesson.isFreePreview && !isEnrolled} />
                                  </ul>
                                 )}
                                {field.units.map(unit => (
                                    <div key={unit.id} className="mt-4">
                                        <h5 className="text-lg font-semibold text-indigo-700 mb-2 pl-2">{unit.title}</h5>
                                        <ul className="space-y-2 border-r-2 border-indigo-200 pr-4 mr-2">
                                            {unit.lessons.map(lesson => (
                                                <LessonItem key={lesson.id} lesson={lesson} isSelected={lesson.id === selectedLesson?.id} isLocked={!lesson.isFreePreview && !isEnrolled} />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                         )
                      })
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <p>لا توجد نتائج تطابق بحثك.</p>
                      </div>
                    )}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;