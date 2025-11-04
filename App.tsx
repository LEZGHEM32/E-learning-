import React, { useState, useCallback } from 'react';
import type { Page, User, Course, CourseId } from './types';
import { COURSES_DATA } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CourseDetailPage from './components/CourseDetailPage';
import AuthModal from './components/AuthModal';
import ActivationModal from './components/ActivationModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const [courseToActivate, setCourseToActivate] = useState<CourseId | null>(null);

  const handleSelectCourse = useCallback((course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course');
    window.scrollTo(0, 0);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedCourse(null);
    setCurrentPage('home');
  }, []);
  
  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const handleLogin = useCallback((partialUser: Omit<User, 'progress'>) => {
    // For this simulation, we use a single key for all users.
    const storedProgress = localStorage.getItem('alkholasa-user-progress');
    const progress = storedProgress ? JSON.parse(storedProgress) : {};
    setUser({ ...partialUser, progress });
  }, []);

  const handleStartEnrollment = useCallback((courseId: CourseId) => {
    if (!user) {
        openAuthModal();
        return;
    }
    setCourseToActivate(courseId);
    setIsActivationModalOpen(true);
  }, [user, openAuthModal]);

  const completeEnrollment = useCallback((courseId: CourseId) => {
    setUser(currentUser => {
        if (!currentUser || currentUser.enrolledCourses.includes(courseId)) {
            return currentUser;
        }
        alert(`تهانينا! لقد التحقت بمادة ${COURSES_DATA.find(c => c.id === courseId)?.title} بنجاح.`);
        
        const newProgress = {
          ...currentUser.progress,
          [courseId]: currentUser.progress[courseId] || [],
        };

        const updatedUser = {
            ...currentUser,
            enrolledCourses: [...currentUser.enrolledCourses, courseId],
            progress: newProgress
        };
        
        localStorage.setItem('alkholasa-user-progress', JSON.stringify(newProgress));

        return updatedUser;
    });
    setIsActivationModalOpen(false);
    setCourseToActivate(null);
  }, []);

  const handleMarkLessonComplete = useCallback((courseId: CourseId, lessonId: string) => {
    setUser(currentUser => {
        if (!currentUser) return null;

        const courseProgress = currentUser.progress[courseId] || [];
        if (courseProgress.includes(lessonId)) {
            return currentUser; // Already completed
        }

        const newProgress = {
            ...currentUser.progress,
            [courseId]: [...courseProgress, lessonId],
        };

        const updatedUser = { ...currentUser, progress: newProgress };
        
        localStorage.setItem('alkholasa-user-progress', JSON.stringify(newProgress));
        
        return updatedUser;
    });
  }, []);


  const renderContent = () => {
    if (currentPage === 'course' && selectedCourse) {
      return (
        <CourseDetailPage
          course={selectedCourse}
          user={user}
          onBack={handleGoHome}
          onLoginClick={openAuthModal}
          onStartEnrollment={handleStartEnrollment}
          onMarkLessonComplete={handleMarkLessonComplete}
        />
      );
    }
    return <HomePage courses={COURSES_DATA} onSelectCourse={handleSelectCourse} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={user} onLoginClick={openAuthModal} onHomeClick={handleGoHome} />
      <div className="flex-grow">
        {renderContent()}
      </div>
      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        onLogin={handleLogin} 
      />
      {courseToActivate && (
        <ActivationModal
            isOpen={isActivationModalOpen}
            onClose={() => setIsActivationModalOpen(false)}
            courseId={courseToActivate}
            onSuccess={completeEnrollment}
        />
      )}
    </div>
  );
};

export default App;